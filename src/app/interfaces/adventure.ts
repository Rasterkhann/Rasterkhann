import { Hero } from './hero';

export enum AdventureDifficulty {
  VeryEasy = 0.75,
  Easy = 1.25,
  Normal = 2,
  Hard = 3,
  VeryHard = 5,
  Tough = 7,
  Challenging = 9,
  Extreme = 11,

  LegendaryStart = 15
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
  bossName?: string;
}

export interface CombatLog {
  advName: string;
  advEncounters: number;
  advLevel: number;
  advDifficulty: AdventureDifficulty;
  encNum: number;
  timestamp: number;
  logs: string[];
  wasSuccess: boolean;
}

export interface Combat {
  start(): void;
  addLogEntry(str: string): void;
  getHeroTag(hero: Hero): string;
}
