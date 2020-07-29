
import { sum } from 'lodash';

import * as NumberFormat from 'swarm-numberformat';

// this file cannot import any helpers or statics
import { IGameTown, BuildingUnlock, HeroStat, Building, BuildingFeature, CombatLog, Hero, HeroTrackedStat, Trait, TownStat } from '../interfaces';
import { featureNameToBuildingHash, featureNameToUnlockHash, getBuildingData } from './building';

export function formatNumber(value: bigint | number): string {
  return NumberFormat.format(value.toString(), { flavor: 'short', sigfigs: 3 });
}

export function calculateGlobalItemCostMultiplier(town: IGameTown): number {
  let multiplier = 1;

  multiplier += 0.01 * town.buildings[Building.Bazaar].level;
  if (town.buildings[Building.Bazaar].currentWorkerId)  { multiplier += 0.25; }
  if (doesTownHaveFeature(town, 'Better Prices'))       { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Even Better Prices'))  { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Higher Prices'))       { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Even Higher Prices'))  { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Stronger Prices'))     { multiplier += 0.1; }

  return multiplier;
}

export function calculateItemDurability(town: IGameTown, boostStats: Array<{ stat: HeroStat, value: number }>): number {
  const statMultipliers: Record<HeroStat, number> = {
    [HeroStat.ATK]: 2,
    [HeroStat.DEF]: 5,
    [HeroStat.EXP]: 1,
    [HeroStat.GOLD]: 1,
    [HeroStat.LVL]: 10,
    [HeroStat.SP]: 1,
    [HeroStat.HP]: 3,
    [HeroStat.STA]: 4
  };

  return Math.floor(sum(boostStats.map(({ stat, value }) => value * statMultipliers[stat])));
}

export function calculateItemCost(town: IGameTown, boostStats: Array<{ stat: HeroStat, value: number }>): bigint {

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

  return BigInt(Math.floor(multiplier * sum(boostStats.map(({ stat, value }) => value * statMultipliers[stat]))));
}

export function addCombatLogToTown(town: IGameTown, log: CombatLog): void {
  town.combatLogs = town.combatLogs || [];
  town.combatLogs.unshift(log);
  if (town.combatLogs.length > 10) { town.combatLogs.length = 10; }
}

export function doesTownHaveFeature(town: IGameTown, feature: string): boolean {
  if (!featureNameToBuildingHash[feature]) { throw new Error(`Feature ${feature} does not exist.`); }
  if (!town.buildings[featureNameToBuildingHash[feature]]) { return false; }
  if (!town.buildings[featureNameToBuildingHash[feature]].features) { return false; }
  return !!town.buildings[featureNameToBuildingHash[feature]].features[feature];
}

export function filteredUnlocksEarnedByTown(town: IGameTown, unlock: keyof BuildingUnlock): any[] {
  return Object.keys(featureNameToBuildingHash)
    .filter(featName => doesTownHaveFeature(town, featName))
    .filter(featName => featureNameToUnlockHash[featName][unlock])
    .map(featName => featureNameToUnlockHash[featName][unlock])
    .flat();
}

export function featureByName(building: Building, feature: string): BuildingFeature {
  return getBuildingData(building).features[feature];
}

export function canSeeBuildingFeature(town: IGameTown, building: Building, feature: string): boolean {
  const featureRef: BuildingFeature = featureByName(building, feature);
  if (!featureRef) { return false; }

  if (doesTownHaveFeature(town, feature)) { return false; }

  if (featureRef.requiresLevel && town.buildings[building].level < featureRef.requiresLevel) { return false; }

  if (featureRef.requiresFeature) {
    const allPreFeatures = Object.keys(featureRef.requiresFeature)
      .every(feat => doesTownHaveFeature(town, feat));
    if (!allPreFeatures) { return false; }
  }

  return true;
}

export function visibleBuildingFeatures(town: IGameTown, buildingId: Building): BuildingFeature[] {
  return Object.values(getBuildingData(buildingId).features || {})
          .filter(feature => canSeeBuildingFeature(town, buildingId, feature.name));
}

export function getCurrentStat(hero: Hero, stat: HeroStat): number {
  return hero.currentStats[stat];
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

export function increaseTownStat(town: IGameTown, stat: TownStat, hero: Hero, value: bigint | number = 1n): void {
  town.stats[stat] = town.stats[stat] || {};
  town.stats[stat][hero.job] = town.stats[stat][hero.job] || 0n;
  town.stats[stat][hero.job] += BigInt(value);
}
