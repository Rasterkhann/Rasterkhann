
import { Building, BuildingInfo } from './buildings';

export interface IGameTown {
  name: string;

  gold: bigint;
  goldPerTick: bigint;

  buildings: Record<Building, BuildingInfo>;
}

export interface IGameState {
  currentInfo: string;
  currentTown: string;
  towns: Record<string, IGameTown>;
}
