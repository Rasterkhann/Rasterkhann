
import { IGameTown } from './town';

export enum GameOption {
  ToggleUpgradeVisiblity = 'toggleupgradevisibility'
}

export interface IGameState {
  version: number;
  lastTimestamp: number;
  currentInfo: string;
  currentTown: string;
  towns: Record<string, IGameTown>;
  options: Partial<Record<GameOption, boolean|string>>;
}
