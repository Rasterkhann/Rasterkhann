
import { BuildingData } from '../static/building'; // this is not a barrel import because that causes a circular dependency loop
import { Building } from '../interfaces';

// get a hash of feature->building for easy lookup later
// also serves to dupe-check names
export const featureNameToBuildingHash = {};
Object.keys(BuildingData).forEach((building: Building) => {
  Object.values(BuildingData[building].features || {}).forEach(feature => {
    if (featureNameToBuildingHash[feature.name]) {
      throw new Error(`${feature.name} already exists for building ${featureNameToBuildingHash[feature.name]}. Cannot also add it under ${building}.`);
    }

    featureNameToBuildingHash[feature.name] = building;
  });
});
