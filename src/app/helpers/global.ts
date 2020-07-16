
import { sum } from 'lodash';

// this file cannot import any helpers or statics
import { IGameTown, BuildingUnlock, HeroStat, Building, BuildingFeature, CombatLog } from '../interfaces';
import { BuildingData } from '../static';
import { featureNameToBuildingHash, featureNameToUnlockHash } from './building';

export function calculateGlobalCostMultiplier(town: IGameTown): number {
  let multiplier = 1;
  multiplier += 0.01 * town.buildings[Building.Bazaar].level;
  if (doesTownHaveFeature(town, 'Better Prices'))       { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Even Better Prices'))  { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Higher Prices'))       { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Even Higher Prices'))  { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Stronger Prices'))     { multiplier += 0.1; }

  return multiplier;
}

export function calculateItemCost(town: IGameTown, boostStats: Array<{ stat: HeroStat, value: number }>): bigint {

  const multiplier = calculateGlobalCostMultiplier(town);

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
  return BuildingData[building].features[feature];
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
  return Object.values(BuildingData[buildingId].features || {})
          .filter(feature => canSeeBuildingFeature(town, buildingId, feature.name));
}
