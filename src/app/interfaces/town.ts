
import { Building, BuildingInfo } from './buildings';
import { Hero, ProspectiveHero } from './hero';
import { Adventure } from './adventure';

export interface IGameTown {
  name: string;

  gold: bigint;
  goldPerTick: bigint;

  buildings: Record<Building, BuildingInfo>;

  recruitedHeroes: Hero[];
  prospectiveHeroes: ProspectiveHero[];

  activeAdventures: Adventure[];
  potentialAdventures: Adventure[];
}
