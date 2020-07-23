
import { shuffle, take, random, noop, uniq, sample } from 'lodash';
import { v4 as uuid } from 'uuid';

import { Trait, HeroJob, IGameTown, Hero, HeroStat, TriggerType, TraitEffect,
  Building, HeroJobStatic, TraitPriority, Adventure, ItemType, HeroItem, HeroWeapon,
  WeaponSubType, HeroTrackedStat, ArmorWeight, HeroArmor, ArmorSubTypeWeight } from '../interfaces';
import { JobEffects } from '../static/job';
import { TraitEffects } from '../static/trait';
import { ensureHeroStatValue } from './trait';
import { filteredUnlocksEarnedByTown, doesTownHaveFeature, getCurrentStat } from './global';
import { getLibraryTraitModifier } from './library';

export function calculateMaxHeldWeapons(town: IGameTown, hero: Hero): number {
  let base = 1;
  if (doesHeroHaveTrait(hero, 'Multi-armed')) { base += 1; }
  return base;
}

export function calculateMaxHeldArmors(town: IGameTown, hero: Hero): number {
  let base = 1;
  if (doesHeroHaveTrait(hero, 'Tiny Body')) { base += 1; }
  return base;
}

export function calculateMaxHeldPotions(town: IGameTown, hero: Hero): number {
  let base = 1;
  if (doesHeroHaveTrait(hero, 'Big Satchel')) { base += 1; }
  return base;
}

export function allEquippableWeapons(town: IGameTown, hero: Hero): WeaponSubType[] {
  const base = JobEffects[hero.job].validWeaponTypes;

  Object.values(WeaponSubType).forEach(subType => {
    if (subType === WeaponSubType.Arrow) { return; }
    if (!doesHeroHaveTrait(hero, `${subType} User` as Trait)) { return; }

    base.push(subType);
  });

  return uniq(base);
}

export function allEquippableArmorClasses(town: IGameTown, hero: Hero): ArmorWeight[] {
  const base = JobEffects[hero.job].validArmorClasses;

  Object.values(ArmorWeight).forEach(subType => {
    if (!doesHeroHaveTrait(hero, `${subType} Armor User` as Trait)) { return; }

    base.push(subType);
  });

  return uniq(base);
}

export function canEquipWeapon(town: IGameTown, hero: Hero, item: HeroWeapon): boolean {
  return allEquippableWeapons(town, hero).includes(item.subType);
}

export function canEquipArmor(town: IGameTown, hero: Hero, item: HeroArmor): boolean {
  return allEquippableArmorClasses(town, hero).includes(ArmorSubTypeWeight[item.subType]);
}

export function unequipItem(hero: Hero, unequippedItem: HeroItem): void {
  unequippedItem.boostStats.forEach(({ stat, value }) => {
    hero.stats[stat] -= value;
    hero.currentStats[stat] -= value;
  });
}

export function equipItem(hero: Hero, equippedItem: HeroItem, slot: number): void {
  hero.gear[equippedItem.type][slot] = equippedItem;

  equippedItem.boostStats.forEach(({ stat, value }) => {
    hero.stats[stat] += value;
    hero.currentStats[stat] += value;
  });
}

export function getZeroStatBlock(): Record<HeroStat, number> {
  return {
    [HeroStat.LVL]: 0,
    [HeroStat.EXP]: 0,
    [HeroStat.GOLD]: 0,
    [HeroStat.ATK]: 0,
    [HeroStat.DEF]: 0,
    [HeroStat.HP]: 0,
    [HeroStat.SP]: 0,
    [HeroStat.STA]: 0
  };
}

export function doesHeroHaveTrait(hero: Hero, trait: Trait): boolean {
  return hero.traits.includes(trait);
}

export function calculateRestingRate(town: IGameTown): number {

  let baseRate = 1;

  if (town.buildings[Building.Inn])                 { baseRate += 1; }
  if (town.buildings[Building.Inn].currentWorkerId) { baseRate += 3; }
  if (doesTownHaveFeature(town, 'Restful Sleep'))   { baseRate += 1; }
  if (doesTownHaveFeature(town, 'Blissful Sleep'))  { baseRate += 2; }

  return baseRate;
}

export function calculateRestingCost(town: IGameTown): number {

  let baseRate = 0;

  if (town.buildings[Building.Inn])                 { baseRate += town.buildings[Building.Inn].level; }
  if (town.buildings[Building.Inn].currentWorkerId) { baseRate += 25; }
  if (doesTownHaveFeature(town, 'Restful Sleep'))   { baseRate += 50; }
  if (doesTownHaveFeature(town, 'Blissful Sleep'))  { baseRate += 100; }

  return baseRate;
}

export function calculateMaxNumberOfTraits(town: IGameTown): number {

  let baseNum = 1;

  if (doesTownHaveFeature(town, 'Dual Trait'))   { baseNum += 1; }
  if (doesTownHaveFeature(town, 'Tri Trait'))    { baseNum += 1; }

  return baseNum;
}

export function calculateAvailableJobs(town: IGameTown): HeroJob[] {
  return [HeroJob.Adventurer].concat(filteredUnlocksEarnedByTown(town, 'job'));
}

export function calculateAvailableTraits(town: IGameTown, job: HeroJob): Trait[] {
  const baseTraits = ['Weak', 'Frail', 'Ill', 'Clumsy', 'Reclusive', 'Sedentary', 'Poor', 'Inexperienced'] as Trait[];
  const bonusTraits = filteredUnlocksEarnedByTown(town, 'trait') as Trait[];
  return baseTraits
    .concat(bonusTraits)
    .filter(trait => {
      const invalidClasses = TraitEffects[trait].cantAttachToClass;
      if (!invalidClasses) { return true; }
      return !invalidClasses.includes(job);
    });
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
  let base = 10n;

  if (doesTownHaveFeature(town, 'Cheaper Training I'))   { base -= 1n; }
  if (doesTownHaveFeature(town, 'Cheaper Training II'))  { base -= 1n; }
  if (doesTownHaveFeature(town, 'Cheaper Training III')) { base -= 1n; }
  if (doesTownHaveFeature(town, 'Cheaper Training IV'))  { base -= 1n; }
  if (doesTownHaveFeature(town, 'Cheaper Training V'))   { base -= 1n; }

  return base;
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
  const job = take(shuffle(allJobs))[0];

  const allTraits = calculateAvailableTraits(town, job);
  const maxTraits = calculateMaxNumberOfTraits(town);

  const numTraits = random(1, maxTraits);
  const traits: Trait[] = [];

  const jobStatic: HeroJobStatic = JobEffects[job];

  const ignoreChance = getLibraryTraitModifier(town);

  const pickTraitFromList = (traitList: Trait[]) => {
    let trait: Trait | null = null;
    do {
      trait = sample(traitList.filter(t => !traits.includes(t))) as Trait;
      if (random(1, 100) <= ignoreChance) { trait = null; }
    } while (!trait);

    return trait;
  };

  // pick traits
  if (numTraits > 1) {
    for (let i = 0; i < numTraits - 1; i++) {
      traits.push(pickTraitFromList(allTraits.filter(t => TraitEffects[t].priority !== TraitPriority.Last)));
    }
  }

  traits.push(pickTraitFromList(allTraits.filter(t => TraitEffects[t].priority === TraitPriority.Last)));

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
    currentlyWorkingAt: null,
    currentlyWorkingTicks: 0,
    currentlyWorkingEarned: 0,

    job,
    traits,

    stats: Object.assign({}, stats) as Record<HeroStat, number>,
    currentStats: Object.assign({}, stats) as Record<HeroStat, number>,
    gear: {
      [ItemType.Potion]: [],
      [ItemType.Weapon]: [],
      [ItemType.Armor]: []
    },
    trackedStats: {
      [HeroTrackedStat.AdventuresSucceeded]: 0,
      [HeroTrackedStat.EXPEarned]: 0,
      [HeroTrackedStat.EncountersSucceeded]: 0,
      [HeroTrackedStat.GoldEarned]: 0,
      [HeroTrackedStat.ItemsBought]: 0,
      [HeroTrackedStat.PotionsUsed]: 0,
      [HeroTrackedStat.TotalAdventures]: 0,
      [HeroTrackedStat.TotalEncounters]: 0,
      [HeroTrackedStat.OddJobsDone]: 0,
      [HeroTrackedStat.OddJobsMoney]: 0
    }
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
    hero.currentStats[stat] = hero.stats[stat];
  });

  return hero;
}

export function generateMonster(town: IGameTown, adventure: Adventure): Hero {
  const baseHero = generateHero(town, adventure.encounterLevel);

  const adjectives = ['Tiny', 'Small', 'Short', 'Stout', 'Large', 'Gigantic', 'Humongous', 'Gargantuan', 'Colossal'];
  const monsterNames = [
    'Chicken', 'Bandit', 'Bugbear', 'Cultist', 'Gnoll', 'Goblin', 'Hobgoblin', 'Kobold', 'Orc', 'Sahagin', 'Thug', 'Rat',
    'Ettin', 'Giant', 'Ghast', 'Ghost', 'Spectre', 'Ghoul', 'Lich', 'Minotaur', 'Mummy', 'Skeleton', 'Ogre', 'Troll', 'Wight',
    'Zombie'
  ];

  let name = sample(monsterNames) as string;
  if (random(1, 10) <= 3) {
    name = `${sample(adjectives)} ${name}`;
  }

  baseHero.name = name;

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

  // randomly give them gold because gold is nice
  // but also lower their exp into normalish ranges
  const bonusStatMult = random(baseHero.currentStats[HeroStat.LVL] * 0.05, baseHero.currentStats[HeroStat.LVL] * 0.10);
  baseHero.currentStats[HeroStat.GOLD] *= adventure.difficulty;
  baseHero.currentStats[HeroStat.GOLD] *= bonusStatMult;
  baseHero.currentStats[HeroStat.EXP] /= 5;

  return baseHero;
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
