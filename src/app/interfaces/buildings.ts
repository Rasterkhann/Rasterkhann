import { HouseFeatures, GuildHallFeatures, ArmoryFeatures,
  AlchemistFeatures, InnFeatures, CaveFeatures, BazaarFeatures } from '../features';

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
  features?: Record<string, boolean>;
  featureConstruction?: Record<string, number>;
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
  features?: Array<BuildingFeature>;
}

export const BuildingData: Record<Building, BuildingStatic> = {
  [Building.TownHall]: {
    name: 'Town Hall',
    description: 'Build or upgrade your town.',
    upgradeTime: () => 0,
    levelCost: () => 0n
  },

  [Building.Watchtower]: {
    name: 'Watchtower',
    description: 'Manage town settings here.',
    upgradeTime: () => 0,
    levelCost: () => 0n
  },

  [Building.Workshop]: {
    name: 'Workshop',
    description: 'Manage your automation settings for your town.',
    upgradeTime: () => 30,
    levelCost: (x) => x === 1 ? 5000n : 0n
  },

  [Building.House]: {
    name: 'House',
    description: 'Acquire more citizens to increase your gold gain.',
    upgradeTime: (level) => level * 5,
    levelCost: (x) => BigInt(Math.floor((15 * x) + (2 * (1.1 ** x)))),
    features: HouseFeatures
  },

  [Building.GuildHall]: {
    name: 'Guild Hall',
    description: 'Recruit heroes to your cause.',
    upgradeTime: (level) => level * 20,
    levelCost: (x) => BigInt(Math.floor((500 * x) + (1.5 * (1.3 ** x)))),
    features: GuildHallFeatures
  },

  [Building.Armory]: {
    name: 'Armory',
    description: 'Create better gear for your heroes.',
    requires: {
      [Building.GuildHall]: 1
    },
    upgradeTime: (level) => level * 20,
    levelCost: (x) => BigInt(Math.floor((250 * x) + (3 * (1.25 ** x)))),
    features: ArmoryFeatures
  },

  [Building.Alchemist]: {
    name: 'Alchemist',
    description: 'Create better potions for your heroes.',
    requires: {
      [Building.GuildHall]: 1
    },
    upgradeTime: (level) => level * 15,
    levelCost: (x) => BigInt(Math.floor((350 * x) + (2 * (1.25 ** x)))),
    features: AlchemistFeatures
  },

  [Building.Inn]: {
    name: 'Inn',
    description: 'Allow your heroes to regain their stamina more quickly after an adventure.',
    requires: {
      [Building.GuildHall]: 1
    },
    upgradeTime: (level) => level * 60,
    levelCost: (x) => BigInt(Math.floor((650 * x) + (1.5 * (1.32 ** x)))),
    features: InnFeatures
  },

  [Building.Bazaar]: {
    name: 'Bazaar',
    description: 'Allow your heroes to buy items before an adventure.',
    requires: {
      [Building.Armory]: 1,
      [Building.Alchemist]: 1,
    },
    upgradeTime: (level) => level * 30,
    levelCost: (x) => BigInt(Math.floor((875 * x) + (5 * (1.2 ** x)))),
    features: BazaarFeatures
  },

  [Building.Cave]: {
    name: 'Cave of Adventure',
    description: 'Allow your heroes to go on adventures.',
    requires: {
      [Building.GuildHall]: 1
    },
    upgradeTime: (level) => level * 15,
    levelCost: (x) => BigInt(Math.floor((500 * x) + (1.2 * (1.35 ** x)))),
    features: CaveFeatures
  }
};
