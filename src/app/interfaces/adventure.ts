import { Hero } from './hero';

export enum AdventureDifficulty {
  VeryEasy = 1,
  Easy = 1.5,
  Normal = 3,
  Hard = 5,
  VeryHard = 10
}

export interface Adventure {
  uuid: string;
  name: string;
  difficulty: AdventureDifficulty;
  duration: number;
  encounterLevel: number;
  encounterCount: number;
  encounterTicks: number[];
  activeHeroes: string[];
}

export interface CombatLog {
  advName: string;
  advEncounters: number;
  advLevel: number;
  advDifficulty: AdventureDifficulty;
  encNum: number;
  timestamp: number;
  logs: string[];
}

export interface Combat {
  start(): void;
  addLogEntry(str: string): void;
  getHeroTag(hero: Hero): string;
}
