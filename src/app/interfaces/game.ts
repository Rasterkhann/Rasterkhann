
import { GameTown } from './town';

export enum GameOption {
  AutomationHeroes = 'automationHeroes',
  AutomationBuildings = 'automationBuildings',
  AutomationAdventures = 'automationAdventures',
  AutomationScrap = 'automationScrap',
  AutomationFeatures = 'automationFeatures',
  ShowHelpText = 'showHelpText',
  ShowStatTooltips = 'showStatTooltips',
  ShowConfirmationDialogs = 'showConfirmationDialogs'
}

export interface IGameState {
  version: number;
  lastTimestamp: number;
  currentInfo: string;
  autoOpenInfo?: boolean;
  currentTown: string;
  towns: Record<string, GameTown>;
  options: Partial<Record<GameOption, boolean|string>>;
}
