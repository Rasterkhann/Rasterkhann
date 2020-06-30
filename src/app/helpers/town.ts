
import { IGameState, IGameTown, Building, BuildingData } from '../interfaces';

// get a hash of feature->building for easy lookup later
// also serves to dupe-check names
const featureNameToBuildingHash = {};
Object.keys(BuildingData).forEach((building: Building) => {
  (BuildingData[building].features || []).forEach(feature => {
    if (featureNameToBuildingHash[feature.name]) {
      throw new Error(`${feature.name} already exists for building ${featureNameToBuildingHash[feature.name]}. Cannot also add it under ${building}.`);
    }

    featureNameToBuildingHash[feature.name] = building;
  });
});

export function getCurrentTownFromState(state: IGameState): IGameTown {
  return { name: state.currentTown, ...state.towns[state.currentTown] };
}

export function calculateGoldGain(state: IGameState): bigint {
  const town = getCurrentTownFromState(state);
  return BigInt(town.buildings.house.level) + town.goldPerTick;
}

export function calculateOfflineGold(state: IGameState): bigint {
  const goldGainPerTick = calculateGoldGain(state);
  const now = Date.now();
  const prev = state.lastTimestamp;

  const diffSeconds = ((now - prev) / 1000);
  return goldGainPerTick * BigInt(Math.floor(diffSeconds));
}

export function doesTownHaveFeature(town: IGameTown, feature: string): boolean {
  if (!featureNameToBuildingHash[feature]) { throw new Error(`Feature ${feature} does not exist.`); }
  return town.buildings[featureNameToBuildingHash[feature]].features[feature];
}
