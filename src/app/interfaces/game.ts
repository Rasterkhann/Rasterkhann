
import { IGameTown } from './town';

export enum GameOption {
  AutomationHeroes = 'automationHeroes',
  AutomationBuildings = 'automationBuildings',
  AutomationAdventures = 'automationAdventures',
  AutomationScrap = 'automationScrap',
  ShowHelpText = 'showHelpText'
}

export interface IGameState {
  version: number;
  lastTimestamp: number;
  currentInfo: string;
  autoOpenInfo?: boolean;
  currentTown: string;
  towns: Record<string, IGameTown>;
  options: Partial<Record<GameOption, boolean|string>>;
}
