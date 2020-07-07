
export enum AdventureDifficulty {
  VeryEasy = 0.5,
  Easy = 0.75,
  Normal = 1,
  Hard = 1.25,
  VeryHard = 1.5
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
