
import { BuildingData } from '../static/building'; // this is not a barrel import because that causes a circular dependency loop
import { Building, BuildingUnlock, BuildingStatic } from '../interfaces';

// get a hash of feature->building for easy lookup later
// also serves to dupe-check names
export const featureNameToBuildingHash: Record<string, Building> = {};
Object.keys(BuildingData).forEach((building: Building) => {
  Object.values(BuildingData[building].features || {}).forEach(feature => {
    if (featureNameToBuildingHash[feature.name]) {
      throw new Error(`${feature.name} already exists for building ${featureNameToBuildingHash[feature.name]}. Cannot also add it under ${building}.`);
    }

    featureNameToBuildingHash[feature.name] = building;
  });
});

// get a hash of feature->unlock for easy lookup later
export const featureNameToUnlockHash: Record<string, BuildingUnlock> = {};
Object.keys(BuildingData).forEach((building: Building) => {
  Object.values(BuildingData[building].features || {}).forEach(feature => {
    if (featureNameToUnlockHash[feature.name]) {
      throw new Error(`${feature.name} already exists for building ${featureNameToUnlockHash[feature.name]}. Cannot also add it under ${building}.`);
    }

    featureNameToUnlockHash[feature.name] = feature.unlocks || {};
  });
});

export function getBuildingData(building: Building): BuildingStatic {
  return BuildingData[building];
}
