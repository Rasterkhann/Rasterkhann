
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
  Cave = 'cave'
}

export interface BuildingInfo {
  level: number;
  constructionDoneAt?: number;
  features: Record<string, number>;
  featureConstruction: Record<string, number>;
}

export interface BuildingFeature {
  name: string;
  description: string;
  cost: bigint;
  upgradeTime: number;
  requiresLevel?: number;
  requiresFeature?: Record<string, number>;
}

export interface BuildingStatic {
  name: string;
  description: string;
  requires?: Partial<Record<Building, number>>;
  upgradeTime: (level: number) => number;
  levelCost: (level: number) => bigint;
  features: Record<string, BuildingFeature>;
}
