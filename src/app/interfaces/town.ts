
import { Building, BuildingInfo } from './buildings';
import { Hero, ProspectiveHero } from './hero';
import { Adventure, CombatLog } from './adventure';
import { HeroItem, ItemType } from './item';

export interface NewsItem {
  timestamp: number;
  message: string;
}

export interface IGameTown {
  name: string;

  gold: bigint;
  goldPerTick: bigint;

  buildings: Record<Building, BuildingInfo>;

  recruitedHeroes: Hero[];
  prospectiveHeroes: ProspectiveHero[];

  activeAdventures: Adventure[];
  potentialAdventures: Adventure[];

  recentNews: NewsItem[];

  itemsForSale: Record<ItemType, HeroItem[]>;
  nextItemCreation: Record<ItemType, number>;

  combatLogs: CombatLog[];
}
