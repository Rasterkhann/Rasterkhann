
import { Building, BuildingInfo } from './buildings';
import { Hero, ProspectiveHero, HeroJob } from './hero';
import { Adventure, CombatLog } from './adventure';
import { HeroItem, ItemType } from './item';

export enum TownStat {
  Retires = 'retires',
  Adventures = 'adventures',
  Encounters = 'encounters',
  Levels = 'levels',
  Gold = 'gold',
  CrystalsSpent = 'crystals'
}

export interface NewsItem {
  timestamp: number;
  message: string;
}

export interface GameTown {
  name: string;

  gold: bigint;
  goldPerTick: bigint;

  crystalCurrency: Record<HeroJob, number>;

  buildings: Record<Building, BuildingInfo>;

  recruitedHeroes: Hero[];
  prospectiveHeroes: ProspectiveHero[];

  activeAdventures: Adventure[];
  potentialAdventures: Adventure[];

  recentNews: NewsItem[];

  itemsForSale: Record<ItemType, HeroItem[]>;
  nextItemCreation: Record<ItemType, number>;

  combatLogs: CombatLog[];
  stats: Record<TownStat, Record<HeroJob, bigint>>;
}
