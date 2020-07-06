
export interface Adventure {
  uuid: string;
  name: string;
  duration: number;
  encounterLevel: number;
  encounterCount: number;
  encounterTicks: number[];
  activeHeroes: string[];
}
