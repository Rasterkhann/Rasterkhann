import { IGameTown, Adventure, Hero } from '../interfaces';
import { getTownHeroByUUID, checkHeroLevelUp } from './hero';
import { doCombat } from './combat';

export function calculateMaxActiveAdventures(town: IGameTown): number {
  return 1;
}

export function calculateMaxPotentialAdventures(town: IGameTown): number {
  return 3;
}

export function calculateMaxNumberAdventureEncounters(town: IGameTown): number {
  return 3;
}

export function doAdventureEncounter(town: IGameTown, adventure: Adventure): void {
  const chosenHeroes = adventure.activeHeroes.map(uuid => getTownHeroByUUID(town, uuid)).filter(Boolean) as Hero[];
  doCombat(chosenHeroes, adventure);

  // TODO: give xp, gold, lose stamina
  chosenHeroes.forEach(h => checkHeroLevelUp(h));
}

export function finalizeAdventure(town: IGameTown, adventure: Adventure): void {
  const chosenHeroes = adventure.activeHeroes.map(uuid => getTownHeroByUUID(town, uuid)).filter(Boolean);

  // TODO: give loot, big xp reward, big gold reward
  chosenHeroes.forEach(h => {
    if (!h) { return; }
    h.onAdventure = '';
    checkHeroLevelUp(h);
  });
}
