
import { IGameState, IGameTown, Hero, ProspectiveHero, Building, Adventure, ItemType, HeroItem } from '../interfaces';
import { calculateMaxActiveAdventures, tickAdventure } from './adventure';
import { canHeroGoOnAdventure } from './hero';
import { doesTownHaveFeature } from './global';

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

export function calculateOfflineAdventureProgress(state: IGameState): void {
  const now = Date.now();
  const prev = state.lastTimestamp;

  const diffSeconds = ((now - prev) / 1000);
  const maxTicks = Math.min(diffSeconds, 21600); // you can get at most 6 hours of offline adventure progress

  const town = state.towns[state.currentTown];

  for (let i = 0; i < maxTicks; i++) {
    town.activeAdventures.forEach(adv => {
      tickAdventure(town, adv);
    });
  }
}

export function calculateGoldGain(state: IGameState): bigint {
  const town = getCurrentTownFromState(state);

  let goldMultiplier = 1n;
  if (doesTownHaveFeature(town, 'Children'))        { goldMultiplier += 1n; }
  if (doesTownHaveFeature(town, 'Another Child'))   { goldMultiplier += 1n; }
  if (doesTownHaveFeature(town, 'Grown Children'))  { goldMultiplier += 2n; }

  return (BigInt(town.buildings[Building.House].level) * goldMultiplier) + town.goldPerTick;
}

export function getCurrentTownRecruitedHeroes(state: IGameState): Hero[] {
  const town = getCurrentTownFromState(state);
  return town.recruitedHeroes;
}

export function getCurrentTownProspectiveHeroes(state: IGameState): ProspectiveHero[] {
  const town = getCurrentTownFromState(state);
  return town.prospectiveHeroes;
}

export function getCurrentTownActiveAdventures(state: IGameState): Adventure[] {
  const town = getCurrentTownFromState(state);
  return town.activeAdventures;
}

export function getCurrentTownPotentialAdventures(state: IGameState): Adventure[] {
  const town = getCurrentTownFromState(state);
  return town.potentialAdventures;
}

// heroes are only free if they're not on an adventure and have full STA
export function getTownAllHeroesFree(town: IGameTown): Hero[] {
  return town.recruitedHeroes.filter((h: Hero) => canHeroGoOnAdventure(h));
}

export function getCurrentTownAnyHeroesFree(state: IGameState): boolean {
  const town = getCurrentTownFromState(state);
  return getTownAllHeroesFree(town).length > 0;
}

export function getCurrentTownItemsForSale(state: IGameState): Record<ItemType, HeroItem[]> {
  const town = getCurrentTownFromState(state);
  return town.itemsForSale;
}

export function getCurrentTownCanDoAnyAdventures(state: IGameState): boolean {
  const town = getCurrentTownFromState(state);
  return getCurrentTownAnyHeroesFree(state) && getCurrentTownActiveAdventures(state).length < calculateMaxActiveAdventures(town);
}
