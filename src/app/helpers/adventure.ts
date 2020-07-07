import { IGameTown, Adventure, Hero, AdventureDifficulty } from '../interfaces';
import { getTownHeroByUUID, checkHeroLevelUp } from './hero';
import { doCombat, getTownExpMultiplier, getTownGoldMultiplier } from './combat';

export function calculateMaxActiveAdventures(town: IGameTown): number {
  return 1;
}

export function calculateMaxPotentialAdventures(town: IGameTown): number {
  return 3;
}

export function calculateMaxNumberAdventureEncounters(town: IGameTown): number {
  return 3;
}

export function calculateAvailableDifficulties(town: IGameTown): AdventureDifficulty[] {
  return [
    AdventureDifficulty.VeryEasy, AdventureDifficulty.Easy,
    AdventureDifficulty.Normal,
    AdventureDifficulty.Hard, AdventureDifficulty.VeryHard
  ];
}

export function doAdventureEncounter(town: IGameTown, adventure: Adventure): void {
  const chosenHeroes = adventure.activeHeroes.map(uuid => getTownHeroByUUID(town, uuid)).filter(Boolean) as Hero[];
  doCombat(town, chosenHeroes, adventure);
  chosenHeroes.forEach(h => checkHeroLevelUp(h));
}

export function finalizeAdventure(town: IGameTown, adventure: Adventure): void {
  const chosenHeroes = adventure.activeHeroes.map(uuid => getTownHeroByUUID(town, uuid)).filter(Boolean);

  // TODO: give loot, big xp reward, big gold reward
  chosenHeroes.forEach(h => {
    if (!h) { return; }
    h.onAdventure = '';

    // TODO: exp mult, gold mult, reward based on adventure level, difficulty

    checkHeroLevelUp(h);
  });
}
