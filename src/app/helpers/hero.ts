import { IGameState, Trait, HeroJob } from '../interfaces';

export function calculateMaxNumberOfTraits(state: IGameState): number {
  return 1;
}

export function calculateAvailableJobs(state: IGameState): HeroJob[] {
  return [HeroJob.Adventurer];
}

export function calculateAvailableTraits(state: IGameState): Trait[] {
  return ['Weak', 'Frail', 'Ill', 'Clumsy', 'Reclusive', 'Sedentary', 'Poor'];
}

export function calculateHeroMaxTotal(state: IGameState): number {
  return 3;
}
