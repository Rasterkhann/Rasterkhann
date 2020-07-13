
import { sum } from 'lodash';

// this file cannot import any helpers or statics
import { IGameTown, BuildingUnlock, HeroStat } from '../interfaces';
import { featureNameToBuildingHash, featureNameToUnlockHash } from './building';

export function calculateItemCost(town: IGameTown, boostStats: Array<{ stat: HeroStat, value: number }>): bigint {

  let multiplier = 1;
  if (doesTownHaveFeature(town, 'Better Prices'))       { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Even Better Prices'))  { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Higher Prices'))       { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Even Higher Prices'))  { multiplier += 0.1; }
  if (doesTownHaveFeature(town, 'Stronger Prices'))     { multiplier += 0.1; }

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
