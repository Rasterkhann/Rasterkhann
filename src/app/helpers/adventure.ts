import { IGameTown, Adventure, Hero, AdventureDifficulty, HeroStat } from '../interfaces';
import { getTownHeroByUUID, checkHeroLevelUp } from './hero';
import { doCombat, getTownExpMultiplier, getTownGoldMultiplier, canTeamFight } from './combat';

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
  const chosenHeroes = adventure.activeHeroes.map(uuid => getTownHeroByUUID(town, uuid)).filter(Boolean) as Hero[];

  const expMult = getTownExpMultiplier(town);
  const goldMult = getTownGoldMultiplier(town);

  const baseReward = adventure.encounterCount * adventure.encounterLevel * adventure.difficulty;
  const expReward = 10 * baseReward * expMult;
  const goldReward = baseReward * goldMult;

  chosenHeroes.forEach(h => {
    h.onAdventure = '';
  });

  if (canTeamFight(chosenHeroes)) {
    chosenHeroes.forEach(h => {
      h.currentStats[HeroStat.EXP] += expReward;
      h.currentStats[HeroStat.GOLD] += goldReward;

      checkHeroLevelUp(h);
    });
  }
}
