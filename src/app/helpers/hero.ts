
import { shuffle, take, random, noop } from 'lodash';
import { v4 as uuid } from 'uuid';

import { Trait, HeroJob, IGameTown, Hero, HeroStat, TriggerType, TraitEffect, Building, HeroJobStatic, TraitPriority, Adventure } from '../interfaces';
import { JobEffects } from '../static/job';
import { TraitEffects } from '../static/trait';
import { ensureHeroStatValue } from './trait';
import { filteredUnlocksEarnedByTown, doesTownHaveFeature } from './global';

export function calculateRestingRate(town: IGameTown): number {

  let baseRate = 1;

  if (town.buildings[Building.Inn])                 { baseRate += 1; }
  if (doesTownHaveFeature(town, 'Restful Sleep'))   { baseRate += 1; }
  if (doesTownHaveFeature(town, 'Blissful Sleep'))  { baseRate += 2; }

  return baseRate;
}

export function calculateMaxNumberOfTraits(town: IGameTown): number {
  return 1;
}

export function calculateAvailableJobs(town: IGameTown): HeroJob[] {
  return [HeroJob.Adventurer].concat(filteredUnlocksEarnedByTown(town, 'job'));
}

export function calculateAvailableTraits(town: IGameTown): Trait[] {
  const baseTraits = ['Weak', 'Frail', 'Ill', 'Clumsy', 'Reclusive', 'Sedentary', 'Poor', 'Inexperienced'] as Trait[];
  const bonusTraits = filteredUnlocksEarnedByTown(town, 'trait') as Trait[];
  return baseTraits.concat(bonusTraits);
}

export function calculateProspectiveHeroMaxTotal(town: IGameTown): number {
  let base = 3;

  if (doesTownHaveFeature(town, 'Enticing Army I'))  { base += 1; }
  if (doesTownHaveFeature(town, 'Enticing Army II')) { base += 1; }

  return base;
}

export function calculateHeroMaxTotal(town: IGameTown): number {
  let base = 3;

  if (doesTownHaveFeature(town, 'Bigger Barracks I'))  { base += 1; }
  if (doesTownHaveFeature(town, 'Bigger Barracks II')) { base += 1; }

  return base;
}

export function calculateHeroTrainingGoldPerXP(town: IGameTown): bigint {
  let base = 50n;

  if (doesTownHaveFeature(town, 'Cheaper Training I'))   { base -= 3n; }
  if (doesTownHaveFeature(town, 'Cheaper Training II'))  { base -= 4n; }
  if (doesTownHaveFeature(town, 'Cheaper Training III')) { base -= 5n; }
  if (doesTownHaveFeature(town, 'Cheaper Training IV'))  { base -= 6n; }
  if (doesTownHaveFeature(town, 'Cheaper Training V'))   { base -= 7n; }

  return base;
}

export function getCurrentStat(hero: Hero, stat: HeroStat): number {
  return hero.currentStats[stat];
}

export function canHeroGoOnAdventure(hero: Hero): boolean {
  return !hero.onAdventure
      && getCurrentStat(hero, HeroStat.STA) === hero.stats[HeroStat.STA]
      && getCurrentStat(hero, HeroStat.HP) === hero.stats[HeroStat.HP]
      && getCurrentStat(hero, HeroStat.SP) === hero.stats[HeroStat.SP];
}

export function generateHero(town: IGameTown, level?: number): Hero {

  const generateLevel = level || town.buildings[Building.GuildHall].level || 1;

  const allJobs = calculateAvailableJobs(town);
  const allTraits = calculateAvailableTraits(town);
  const maxTraits = calculateMaxNumberOfTraits(town);

  const job = take(shuffle(allJobs))[0];
  const numTraits = random(1, maxTraits);
  const traits: Trait[] = [];

  const jobStatic: HeroJobStatic = JobEffects[job];

  // pick traits
  if (numTraits > 1) {
    traits.push(...take(shuffle(allTraits.filter(t => TraitEffects[t].priority !== TraitPriority.Last)), numTraits - 1));
  }

  traits.push(...take(shuffle(allTraits.filter(t => TraitEffects[t].priority === TraitPriority.Last))));

  // pick a hero level
  const heroLevel = random(1, generateLevel);

  const stats: Partial<Record<HeroStat, number>> = {
    [HeroStat.LVL]: heroLevel
  };

  // create the random stat block
  Object.values(HeroStat).forEach(stat => {
    if (stats[stat]) { return; }
    stats[stat] = random(1, heroLevel * jobStatic.statGrowth[stat]() * jobStatic.statBaseMultiplier[stat]);
  });

  // create the hero
  const hero: Hero = {
    uuid: uuid(),
    name: jobStatic.chooseName(),
    sprite: take(shuffle(jobStatic.sprites))[0],
    onAdventure: '',

    job,
    traits,

    stats: Object.assign({}, stats) as Record<HeroStat, number>,
    currentStats: Object.assign({}, stats) as Record<HeroStat, number>,
    gear: {}
  };

  // make sure heroes have at least a base of stats before they get ruined by traits
  ensureHeroStatValue(hero, HeroStat.LVL,  1);
  ensureHeroStatValue(hero, HeroStat.ATK,  1);
  ensureHeroStatValue(hero, HeroStat.DEF,  1);
  ensureHeroStatValue(hero, HeroStat.HP,   50);
  ensureHeroStatValue(hero, HeroStat.SP,   10);
  ensureHeroStatValue(hero, HeroStat.STA,  10);
  ensureHeroStatValue(hero, HeroStat.GOLD, 0);
  ensureHeroStatValue(hero, HeroStat.EXP,  100);

  // do onSpawn for all traits
  traits.forEach(trait => {
    const traitEff: TraitEffect = TraitEffects[trait];
    if (!traitEff.triggers || !traitEff.triggers[TriggerType.Spawn]) { return; }

    (traitEff.triggers[TriggerType.Spawn] || noop)({ hero });
  });

  Object.keys(hero.stats).forEach((stat: HeroStat) => {
    hero.stats[stat] = Math.floor(hero.stats[stat]);
    hero.currentStats[stat] = Math.floor(hero.currentStats[stat]);
  });

  return hero;
}

export function generateMonster(town: IGameTown, adventure: Adventure): Hero {
  const baseHero = generateHero(town, adventure.encounterLevel);

  // multiply their stats by the difficulty
  Object.keys(baseHero.stats).forEach((stat: HeroStat) => {
    const newStat = Math.floor(baseHero.stats[stat] * adventure.difficulty);
    baseHero.stats[stat] = newStat;
    baseHero.currentStats[stat] = newStat;
  });

  ensureHeroStatValue(baseHero, HeroStat.LVL,  1);
  ensureHeroStatValue(baseHero, HeroStat.ATK,  1);
  ensureHeroStatValue(baseHero, HeroStat.DEF,  1);
  ensureHeroStatValue(baseHero, HeroStat.HP,   50);
  ensureHeroStatValue(baseHero, HeroStat.SP,   10);
  ensureHeroStatValue(baseHero, HeroStat.STA,  10);
  ensureHeroStatValue(baseHero, HeroStat.GOLD, 0);
  ensureHeroStatValue(baseHero, HeroStat.EXP,  100);

  baseHero.currentStats[HeroStat.GOLD] *= baseHero.currentStats[HeroStat.LVL];

  return baseHero;
}

export function giveHeroEXP(hero: Hero, exp: number): void {
  hero.currentStats[HeroStat.EXP] += Math.floor(exp);
  checkHeroLevelUp(hero);
}

export function giveHeroGold(hero: Hero, gold: number): void {
  hero.currentStats[HeroStat.GOLD] += Math.floor(gold);
}

export function checkHeroLevelUp(hero: Hero): void {
  if (getCurrentStat(hero, HeroStat.EXP) < hero.stats[HeroStat.EXP]) { return; }

  const getLevelupStat = (stat: HeroStat) => {
    return Math.floor(JobEffects[hero.job].statGrowth[stat](hero));
  };

  const numLevels = getLevelupStat(HeroStat.LVL);

  for (let i = 0; i < numLevels; i++) {
    const levelupStats: Record<HeroStat, number> = {
      [HeroStat.LVL]:   1,
      [HeroStat.EXP]:   getLevelupStat(HeroStat.EXP),
      [HeroStat.GOLD]:  getLevelupStat(HeroStat.GOLD),
      [HeroStat.HP]:    getLevelupStat(HeroStat.HP),
      [HeroStat.SP]:    getLevelupStat(HeroStat.SP),
      [HeroStat.STA]:   getLevelupStat(HeroStat.STA),
      [HeroStat.ATK]:   getLevelupStat(HeroStat.ATK),
      [HeroStat.DEF]:   getLevelupStat(HeroStat.DEF)
    };

    const levelUpJobEffect = JobEffects[hero.job].triggers[TriggerType.LevelUp];
    if (levelUpJobEffect) {
      levelUpJobEffect({ hero, statBlock: levelupStats });
    }

    hero.traits.forEach(trait => {
      const traitEffect = TraitEffects[trait].triggers[TriggerType.LevelUp];
      if (!traitEffect) { return; }

      traitEffect({ hero, statBlock: levelupStats });
    });

    Object.keys(levelupStats).forEach((stat: HeroStat) => {
      levelupStats[stat] = Math.max(0, Math.floor(levelupStats[stat]));

      hero.currentStats[stat] += levelupStats[stat];
      hero.stats[stat] += levelupStats[stat];
    });

    hero.currentStats[HeroStat.EXP] = 0;
  }
}

export function getTownHeroByUUID(town: IGameTown, checkUUID: string): Hero | undefined {
  return town.recruitedHeroes.find(h => h.uuid === checkUUID);
}
