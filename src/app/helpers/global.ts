
import { sum, get, isUndefined, isObject } from 'lodash';

import * as NumberFormat from 'swarm-numberformat';

// this file cannot import any helpers or statics
import { GameTown, BuildingUnlock, HeroStat, Building, BuildingFeature, CombatLog, Hero, HeroTrackedStat, Trait, TownStat, HallOfFameStat, HallOfFameHero } from '../interfaces';
import { featureNameToBuildingHash, featureNameToUnlockHash, getBuildingData } from './building';

export function formatNumber(value: bigint | number): string {
  return NumberFormat.format(value.toString(), { flavor: 'short', sigfigs: 3 });
}

export function numAllocatedToBuilding(town: GameTown, building: Building): number {
  return town.buildings[building].numRetiredAllocated || 0;
}

export function calculateGlobalItemCostMultiplier(town: GameTown): number {
  let multiplier = 1;

  multiplier += 0.01 * town.buildings[Building.Bazaar].level;
  if (town.buildings[Building.Bazaar].currentWorkerId)  { multiplier += 0.25; }
  if (doesTownHaveFeature(town, 'Better Prices'))       { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Even Better Prices'))  { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Higher Prices'))       { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Even Higher Prices'))  { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Stronger Prices'))     { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Highway Robbery'))     { multiplier += 0.25; }

  return multiplier;
}

export function calculateItemDurability(town: GameTown, boostStats: Array<{ stat: HeroStat, value: number }>): number {
  const statMultipliers: Record<HeroStat, number> = {
    [HeroStat.ATK]: -1,
    [HeroStat.DEF]: 3,
    [HeroStat.EXP]: 1,
    [HeroStat.GOLD]: 1,
    [HeroStat.LVL]: 10,
    [HeroStat.SP]: 1,
    [HeroStat.HP]: 2,
    [HeroStat.STA]: 2
  };

  return Math.floor(sum(boostStats.map(({ stat, value }) => value * statMultipliers[stat])));
}

export function calculateItemCost(town: GameTown, boostStats: Array<{ stat: HeroStat, value: number }>, typeMultiplier: bigint): bigint {

  const multiplier = calculateGlobalItemCostMultiplier(town);

  const statMultipliers: Record<HeroStat, number> = {
    [HeroStat.ATK]: 150,
    [HeroStat.DEF]: 120,
    [HeroStat.EXP]: 300,
    [HeroStat.GOLD]: 300,
    [HeroStat.LVL]: 1000,
    [HeroStat.SP]: 50,
    [HeroStat.HP]: 100,
    [HeroStat.STA]: 200
  };

  return typeMultiplier * BigInt(Math.floor(multiplier * sum(boostStats.map(({ stat, value }) => value * statMultipliers[stat]))));
}

export function addCombatLogToTown(town: GameTown, log: CombatLog): void {
  town.combatLogs = town.combatLogs || [];
  town.combatLogs.unshift(log);
  if (town.combatLogs.length > 10) { town.combatLogs.length = 10; }
}

export function doesTownHaveFeature(town: GameTown, feature: string): boolean {
  if (!featureNameToBuildingHash[feature]) { throw new Error(`Feature ${feature} does not exist.`); }
  if (!town.buildings[featureNameToBuildingHash[feature]]) { return false; }
  if (!town.buildings[featureNameToBuildingHash[feature]].features) { return false; }
  return !!town.buildings[featureNameToBuildingHash[feature]].features[feature];
}

export function filteredUnlocksEarnedByTown(town: GameTown, unlock: keyof BuildingUnlock): any[] {
  return Object.keys(featureNameToBuildingHash)
    .filter(featName => doesTownHaveFeature(town, featName))
    .filter(featName => featureNameToUnlockHash[featName][unlock])
    .map(featName => featureNameToUnlockHash[featName][unlock])
    .flat();
}

export function featureByName(building: Building, feature: string): BuildingFeature {
  return getBuildingData(building).features[feature];
}

export function isBuildingFeatureHidden(town: GameTown, building: Building, feature: string): boolean {
  const featureRef: BuildingFeature = featureByName(building, feature);
  if (!featureRef) { return false; }

  return !!featureRef.hide;
}

export function canSeeBuildingFeature(town: GameTown, building: Building, feature: string): boolean {
  const featureRef: BuildingFeature = featureByName(building, feature);
  if (!featureRef) { return false; }

  if (isBuildingFeatureHidden(town, building, feature)) { return false; }

  if (doesTownHaveFeature(town, feature)) { return false; }

  if (featureRef.requiresLevel && town.buildings[building].level < featureRef.requiresLevel) { return false; }

  if (featureRef.requiresFeature) {
    const allPreFeatures = Object.keys(featureRef.requiresFeature)
      .every(feat => doesTownHaveFeature(town, feat));
    if (!allPreFeatures) { return false; }
  }

  if (featureRef.requiresTownStat) {
    let meetsStatRequirements = true;

    Object.keys(featureRef.requiresTownStat).forEach(stat => {
      const ref = featureRef.requiresTownStat;
      if (!ref) { return; }

      const val = get(town.stats, stat);

      if (isUndefined(val)) {
        console.error(`Error: Stat ${stat} is undefined; typo?`);
        meetsStatRequirements = false;
      }

      if (isObject(val)) {
        const totalChild = Object.values(val).reduce((prev, cur) => prev + cur, 0n);
        if (Number(totalChild) < ref[stat]) {
          meetsStatRequirements = false;
        }
      }

      if (Number(val) < ref[stat]) {
        meetsStatRequirements = false;
      }
    });

    if (!meetsStatRequirements) { return false; }
  }

  return true;
}

export function allBuildingFeatures(buildingId: Building): BuildingFeature[] {
  return Object.values(getBuildingData(buildingId).features || {})
    .filter(f => !f.hide);
}

export function visibleBuildingFeatures(town: GameTown, buildingId: Building): BuildingFeature[] {
  return allBuildingFeatures(buildingId)
          .filter(feature => canSeeBuildingFeature(town, buildingId, feature.name));
}

export function upcomingBuildingFeatures(town: GameTown, buildingId: Building): BuildingFeature[] {
  return allBuildingFeatures(buildingId)
          .filter(feature => !doesTownHaveFeature(town, feature.name)
                          && !canSeeBuildingFeature(town, buildingId, feature.name));
}

export function getCurrentStat(hero: Hero, stat: HeroStat): number {
  return hero.currentStats[stat];
}

export function heroToHallOfFameHero(hero: Hero, value: number): HallOfFameHero {
  return {
    uuid: hero.uuid,
    name: hero.name,
    level: hero.currentStats[HeroStat.LVL],
    job: hero.job,
    jobSprite: hero.sprite,
    value
  };
}

export function getTownFameStats(town: GameTown): Record<HallOfFameStat, HallOfFameHero[]> {

  const stats: Record<HallOfFameStat, (hero: Hero) => number> = {
    [HallOfFameStat.HighestLevel]:      (hero) => hero.currentStats[HeroStat.LVL],
    [HallOfFameStat.MostAdventuresWon]: (hero) => hero.trackedStats[HeroTrackedStat.AdventuresSucceeded],
    [HallOfFameStat.MostDamageDealt]:   (hero) => hero.trackedStats[HeroTrackedStat.DamageDealt],
    [HallOfFameStat.MostDamageTaken]:   (hero) => hero.trackedStats[HeroTrackedStat.DamageTaken],
    [HallOfFameStat.MostItemsBought]:   (hero) => hero.trackedStats[HeroTrackedStat.ItemsBought],
    [HallOfFameStat.MostPotionsUsed]:   (hero) => hero.trackedStats[HeroTrackedStat.PotionsUsed]
  };

  const newHallOfFame: any = {};

  Object.keys(stats).forEach((stat: HallOfFameStat) => {
    const arr = [...town.hallOfFame[stat]];

    town.recruitedHeroes.forEach(hero => {
      for (let i = 0; i < 3; i++) {
        const value = stats[stat](hero);
        if (arr[i] && value < arr[i].value) { continue; }

        const existingHeroIdx = arr.findIndex(h => h.uuid === hero.uuid);
        if (existingHeroIdx !== -1) {
          arr.splice(existingHeroIdx, 1);
        }

        const newHero = heroToHallOfFameHero(hero, value);
        arr.splice(i, 0, newHero);

        break;
      }
    });

    arr.length = 3;
    newHallOfFame[stat] = arr;
  });

  return newHallOfFame;
}

export function increaseTrackedStat(hero: Hero, stat: HeroTrackedStat, value = 1): void {
  if (value <= 0) { return; }

  hero.trackedStats[stat] = hero.trackedStats[stat] || 0;
  hero.trackedStats[stat] += value;
}

export function giveHeroEXP(hero: Hero, exp: number): void {
  hero.currentStats[HeroStat.EXP] = Math.max(0, Math.floor(hero.currentStats[HeroStat.EXP] + exp));
  increaseTrackedStat(hero, HeroTrackedStat.EXPEarned, exp);
}

export function giveHeroGold(hero: Hero, gold: number): void {
  hero.currentStats[HeroStat.GOLD] = Math.max(0, Math.floor(hero.currentStats[HeroStat.GOLD] + gold));
  increaseTrackedStat(hero, HeroTrackedStat.GoldEarned, gold);
}

export function getHeroTag(hero: Hero): string {
  const bracketed = `[HP ${hero.currentStats[HeroStat.HP]}/SP ${hero.currentStats[HeroStat.SP]}/STA ${hero.currentStats[HeroStat.STA]}]`;
  return `${hero.name} ${bracketed}`;
}

export function doesHeroHaveTrait(hero: Hero, trait: Trait): boolean {
  return hero.traits.includes(trait);
}

export function increaseTownStat(town: GameTown, stat: TownStat, hero: Hero, value: bigint | number = 1n): void {
  town.stats[stat] = town.stats[stat] || {};
  town.stats[stat][hero.job] = town.stats[stat][hero.job] || 0n;
  town.stats[stat][hero.job] = BigInt(town.stats[stat][hero.job]) + BigInt(value);
}
