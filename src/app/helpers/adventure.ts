import { IGameTown, Adventure, Hero, AdventureDifficulty } from '../interfaces';
import { getTownHeroByUUID, checkHeroLevelUp, giveHeroEXP, giveHeroGold } from './hero';
import { doCombat, getTownExpMultiplier, getTownGoldMultiplier, canTeamFight } from './combat';
import { doesTownHaveFeature } from './global';

export function calculateMaxActiveAdventures(town: IGameTown): number {
  let base = 1;

  if (doesTownHaveFeature(town, 'Tunnels I'))  { base += 1; }
  if (doesTownHaveFeature(town, 'Tunnels II')) { base += 1; }

  return base;
}

export function calculateMaxPotentialAdventures(town: IGameTown): number {
  let base = 3;

  if (doesTownHaveFeature(town, 'Infestation I'))  { base += 1; }
  if (doesTownHaveFeature(town, 'Infestation II')) { base += 1; }

  return base;
}

export function calculateMaxNumberAdventureEncounters(town: IGameTown): number {
  let base = 3;

  if (doesTownHaveFeature(town, 'Deeper Cave I'))  { base += 2; }
  if (doesTownHaveFeature(town, 'Deeper Cave II')) { base += 2; }

  return base;
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

export function finalizeAdventure(town: IGameTown, adventure: Adventure): boolean {
  const chosenHeroes = adventure.activeHeroes.map(uuid => getTownHeroByUUID(town, uuid)).filter(Boolean) as Hero[];

  const expMult = getTownExpMultiplier(town);
  const goldMult = getTownGoldMultiplier(town);

  const baseReward = adventure.encounterCount * adventure.encounterLevel * adventure.difficulty;
  const expReward = 10 * baseReward * expMult;
  const goldReward = baseReward * goldMult;

  let didSucceed = false;

  chosenHeroes.forEach(h => {
    h.onAdventure = '';
  });

  if (canTeamFight(chosenHeroes)) {
    didSucceed = true;
    chosenHeroes.forEach(h => {
      giveHeroEXP(h, expReward);
      giveHeroGold(h, goldReward);

      checkHeroLevelUp(h);
    });
  }

  return didSucceed;
}
