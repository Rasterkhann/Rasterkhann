import { Trait, HeroJob, IGameTown } from '../interfaces';

export function calculateMaxNumberOfTraits(town: IGameTown): number {
  return 1;
}

export function calculateAvailableJobs(town: IGameTown): HeroJob[] {
  return [HeroJob.Adventurer];
}

export function calculateAvailableTraits(town: IGameTown): Trait[] {
  return ['Weak', 'Frail', 'Ill', 'Clumsy', 'Reclusive', 'Sedentary', 'Poor', 'Inexperienced'];
}

export function calculateProspectiveHeroMaxTotal(town: IGameTown): number {
  return 3;
}

export function calculateHeroMaxTotal(town: IGameTown): number {
  return 3;
}
