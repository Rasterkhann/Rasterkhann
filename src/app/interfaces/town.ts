
import { Building, BuildingInfo } from './buildings';
import { Hero } from './hero';

export interface IGameTown {
  name: string;

  gold: bigint;
  goldPerTick: bigint;

  buildings: Partial<Record<Building, BuildingInfo>>;

  heroes: Hero[];
}
