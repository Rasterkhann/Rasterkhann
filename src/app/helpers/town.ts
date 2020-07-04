
import { IGameState, IGameTown, Hero, ProspectiveHero, Building, Adventure } from '../interfaces';
import { featureNameToBuildingHash } from './building';
import { calculateMaxActiveAdventures } from './adventure';

export function getCurrentTownFromState(state: IGameState): IGameTown {
  return { name: state.currentTown, ...state.towns[state.currentTown] };
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
  if (!town.buildings[featureNameToBuildingHash[feature]].features) { return false; }
  return !!town.buildings[featureNameToBuildingHash[feature]].features[feature];
}

export function calculateGoldGain(state: IGameState): bigint {
  const town = getCurrentTownFromState(state);

  let goldMultiplier = 1n;
  if (doesTownHaveFeature(town, 'Children'))        { goldMultiplier += 1n; }
  if (doesTownHaveFeature(town, 'Another Child'))   { goldMultiplier += 1n; }
  if (doesTownHaveFeature(town, 'Grown Children'))  { goldMultiplier += 2n; }

  return (BigInt(town.buildings[Building.House].level) * goldMultiplier) + town.goldPerTick;
}

export function getTownRecruitedHeroes(state: IGameState): Hero[] {
  const town = getCurrentTownFromState(state);
  return town.recruitedHeroes;
}

export function getTownProspectiveHeroes(state: IGameState): ProspectiveHero[] {
  const town = getCurrentTownFromState(state);
  return town.prospectiveHeroes;
}

export function getTownActiveAdventures(state: IGameState): Adventure[] {
  const town = getCurrentTownFromState(state);
  return town.activeAdventures;
}

export function getTownPotentialAdventures(state: IGameState): Adventure[] {
  const town = getCurrentTownFromState(state);
  return town.potentialAdventures;
}

export function getTownAnyHeroesFree(state: IGameState): boolean {
  const town = getCurrentTownFromState(state);
  return town.recruitedHeroes.some((h: Hero) => !h.onAdventure);
}

export function getTownCanDoAnyAdventures(state: IGameState): boolean {
  const town = getCurrentTownFromState(state);
  return getTownAnyHeroesFree(state) && getTownActiveAdventures(state).length < calculateMaxActiveAdventures(town);
}
