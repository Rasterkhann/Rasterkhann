
import { v4 as uuid } from 'uuid';
import { sample, sum, random } from 'lodash';

import { GameTown, HeroActionOpts, SkillBook, Building, SkillBookPreset } from '../interfaces';
import { calculateGlobalItemCostMultiplier, doesTownHaveFeature } from './global';
import { SKILL_BOOK_PRESETS } from '../static/skill-presets';

const OPT_VALUE_PER_POINT: Record<keyof HeroActionOpts, number> = {
  staCost: 0,
  spCost: 0,
  pct: 5,
  gold: 3,
  defMultiplier: 1,
  atkMultiplier: 1,
  targets: 7,
  times: 13
};

const OPT_CHANGE_PER_POINT: Record<keyof HeroActionOpts, number> = {
  staCost: 0,
  spCost: 0,
  pct: 3,
  gold: 100,
  defMultiplier: 0.01,
  atkMultiplier: 0.01,
  targets: 1,
  times: 1
};

function getBaseStatValue(stats: HeroActionOpts, stat: keyof HeroActionOpts): number {

  const baseModsToSubtract: Record<keyof HeroActionOpts, number> = {
    staCost: 0,
    spCost: 0,
    pct: 0,
    gold: 0,
    defMultiplier: 0,
    atkMultiplier: 0,
    targets: 1,
    times: 1
  };

  return (stats[stat] || 0) - baseModsToSubtract[stat];
}

function getValidPresets(town: GameTown): SkillBookPreset[] {
  return SKILL_BOOK_PRESETS.filter(preset => {
    if (!preset.jobs) { return true; }
    return preset.jobs.every(job => doesTownHaveFeature(town, `${job} Books`));
  });
}

export function calculateMaxOwnedBooks(town: GameTown): number {
  let base = 3;

  if (doesTownHaveFeature(town, 'Shelf Space I'))  { base += 1; }
  if (doesTownHaveFeature(town, 'Shelf Space II')) { base += 1; }

  return base;
}

export function calculateMaxPotentialBooks(town: GameTown): number {
  let base = 3;

  if (doesTownHaveFeature(town, 'Library Loan I'))  { base += 1; }
  if (doesTownHaveFeature(town, 'Library Loan II')) { base += 1; }

  return base;
}

export function calculateBookCost(town: GameTown, stats: Record<keyof HeroActionOpts, number>): bigint {

  const multiplier = calculateGlobalItemCostMultiplier(town);

  const statMultipliers: Record<keyof HeroActionOpts, number> = {
    staCost: 500,
    spCost: 500,
    pct: 1000,
    gold: 1000,
    defMultiplier: 1000,
    atkMultiplier: 1000,
    targets: 100,
    times: 10000
  };

  const totalValue = Object.keys(stats).map((stat: keyof HeroActionOpts) => stats[stat] * statMultipliers[stat]);

  return BigInt(Math.floor(multiplier * sum(totalValue)));
}

export function skillBookOptsPoints(opts: HeroActionOpts): number {

  const modLPMultipliers: Record<keyof HeroActionOpts, number> = {
    staCost: 0,
    spCost: 0,
    pct: 1,
    gold: 0.01,
    defMultiplier: 1,
    atkMultiplier: 1,
    targets: 5,
    times: 15
  };

  const value = Object.keys(opts).reduce((prev, cur: keyof HeroActionOpts) => {
    const baseValue = getBaseStatValue(opts, cur);
    if (!baseValue || !OPT_CHANGE_PER_POINT[cur] || !modLPMultipliers[cur]) { return prev; }

    return prev + ((baseValue / OPT_CHANGE_PER_POINT[cur]) * modLPMultipliers[cur]);
  }, 0);

  return Math.max(10, Math.floor(value));
}

export function skillBookSTARequired(opts: HeroActionOpts): number {

  const baseModMultipliers: Record<keyof HeroActionOpts, number> = {
    staCost: 0,
    spCost: 0,
    pct: 3,
    gold: 1,
    defMultiplier: 1,
    atkMultiplier: 1,
    targets: 10,
    times: 20
  };

  const value = Object.keys(opts).reduce((prev, cur: keyof HeroActionOpts) => {
    const baseValue = getBaseStatValue(opts, cur);
    if (!baseValue || !baseModMultipliers[cur]) { return prev; }

    return prev + ((baseValue / OPT_CHANGE_PER_POINT[cur]) * baseModMultipliers[cur]);
  }, 0);

  return Math.max(3, Math.floor(value));
}

export function skillBookSPRequired(opts: HeroActionOpts): number {

  const baseModMultipliers: Record<keyof HeroActionOpts, number> = {
    staCost: 0,
    spCost: 0,
    pct: 2,
    gold: 2,
    defMultiplier: 1,
    atkMultiplier: 1,
    targets: 15,
    times: 25
  };

  const value = Object.keys(opts).reduce((prev, cur: keyof HeroActionOpts) => {
    const baseValue = getBaseStatValue(opts, cur);
    if (!baseValue || !baseModMultipliers[cur]) { return prev; }

    return prev + ((baseValue / OPT_CHANGE_PER_POINT[cur]) * baseModMultipliers[cur]);
  }, 0);

  return Math.max(3, Math.floor(value));
}

export function generateSkillBook(town: GameTown): SkillBook {

  const preset = sample(getValidPresets(town)) as SkillBookPreset;

  const baseStats = Object.assign({}, preset.baseStats);

  const numAllocatedBoost = random(0, town.buildings[Building.Library].numRetiredAllocated);
  const level = Math.max(10, random(1, town.buildings[Building.Library].level)) + numAllocatedBoost;
  let curLevelValue = 0;

  for (let i = 0; i < level; i++) {
    const validStats = preset.changeableStats.filter(checkStat => OPT_VALUE_PER_POINT[checkStat] + curLevelValue < level);
    const stat = sample(validStats) as keyof HeroActionOpts;
    if (!stat) { continue; }

    baseStats[stat] += OPT_CHANGE_PER_POINT[stat];
    curLevelValue += OPT_VALUE_PER_POINT[stat];
  }

  Object.keys(baseStats).forEach((stat: keyof HeroActionOpts) => {
    baseStats[stat] = preset.statMults[stat](baseStats[stat]);
  });

  const baseBook: SkillBook = {
    uuid: uuid(),
    name: preset.name,
    cost: calculateBookCost(town, baseStats),
    sprite: preset.sprite,
    actionCaller: preset.action,
    messageCaller: preset.message,
    actionOpts: baseStats,
    requiredJobs: preset.jobs
  };

  return baseBook;
}
