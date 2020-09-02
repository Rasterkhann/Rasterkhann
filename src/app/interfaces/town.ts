
import { Building, BuildingInfo } from './buildings';
import { Hero, ProspectiveHero, HeroJob, HeroStat } from './hero';
import { Adventure, CombatLog } from './adventure';
import { HeroItem, ItemType } from './item';
import { SkillBook } from './skillbook';

export enum TownStat {
  Retires = 'retires',
  Adventures = 'adventures',
  Encounters = 'encounters',
  Levels = 'levels',
  Gold = 'gold',
  CrystalsSpent = 'crystals',
  Legendary = 'legendary'
}

export enum HallOfFameStat {
  HighestLevel = 'highestLevel',
  MostDamageDealt = 'mostDamageDealt',
  MostDamageTaken = 'mostDamageTaken',
  MostAdventuresWon = 'mostAdventuresWon',
  MostItemsBought = 'mostItemsBought',
  MostPotionsUsed = 'mostPotionsUsed'
}

export interface HallOfFameHero {
  uuid: string;
  name: string;
  level: number;
  job: string;
  jobSprite: string;

  value: number;
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
  legendaryAdventures: Adventure[];

  ownedBooks: SkillBook[];
  potentialBooks: SkillBook[];

  recentNews: NewsItem[];

  itemsForSale: Record<ItemType, HeroItem[]>;
  nextItemCreation: Record<ItemType, number>;

  combatLogs: CombatLog[];
  stats: Record<TownStat, Record<HeroJob | string, bigint>>;
  hallOfFame: Record<HallOfFameStat, HallOfFameHero[]>;

  crystalBuffs: Record<HeroStat, number>;
  showStage2UI: boolean;
  allocateWorkersToBuilding: Building | null;
}
