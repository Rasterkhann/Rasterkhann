import { Hero } from './hero';

export interface Adventure {
  name: string;
  duration: number;
  encounterLevel: number;
  encounterCount: number;
  encounterTicks: number[];
  activeHeroes: Hero[];
}
