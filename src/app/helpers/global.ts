
// this file cannot import any helpers or statics
import { IGameTown, BuildingUnlock } from '../interfaces';
import { featureNameToBuildingHash, featureNameToUnlockHash } from './building';

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
