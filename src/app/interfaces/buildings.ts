import { Trait } from './trait';
import { HeroJob } from './hero';
import { ItemTrait } from './item';

export enum Building {
  TownHall = 'townhall',
  Watchtower = 'watchtower',
  Workshop = 'workshop',
  House = 'house',
  GuildHall = 'guildhall',
  Armory = 'armory',
  Alchemist = 'alchemist',
  Inn = 'inn',
  Bazaar = 'bazaar',
  Cave = 'cave',
  Archives = 'archives',
  Library = 'library'
}

export enum BuildingFeatureTime {
  XXXShort = 60,
  XXShort = 120,
  XShort = 180,
  Short = 300,
  Medium = 450,
  Long = 600,
  XLong = 900,
  XXLong = 1200,
  XXXLong = 1800
}

export interface BuildingInfo {
  level: number;
  constructionStartedAt?: number;
  constructionDoneAt?: number;
  features: Record<string, number>;
  featureConstruction: Record<string, number>;
  currentWorkerId: string | null;
}

export interface BuildingFeature {
  name: string;
  description: string;
  cost: bigint;
  upgradeTime: number;
  requiresLevel?: number;
  requiresFeature?: Record<string, number>;
  unlocks?: BuildingUnlock;
}

export interface BuildingStatic {
  name: string;
  description: string;
  requires?: Partial<Record<Building, number>>;
  upgradeTime: (level: number) => number;
  levelCost: (level: number) => bigint;
  features: Record<string, BuildingFeature>;
}

export interface BuildingUnlock {
  trait?: Trait[];
  job?: HeroJob[];
  itemTrait?: ItemTrait[];
}
