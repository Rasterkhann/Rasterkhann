
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
}

export interface BuildingStatic {
  description: string;
  requires?: Partial<Record<Building, number>>;
  levelCost: (level: number) => bigint;
}

export const BuildingData: Record<Building, BuildingStatic> = {
  [Building.TownHall]: {
    description: 'Build or upgrade your town.',
    levelCost: (x) => 0n
  },

  [Building.Watchtower]: {
    description: 'Manage town settings here.',
    levelCost: (x) => 0n
  },

  [Building.Workshop]: {
    description: 'Manage your automation settings for your town.',
    levelCost: (x) => x === 1 ? 100000n : 0n
  },

  [Building.House]: {
    description: 'Acquire more citizens to increase your gold gain.',
    levelCost: (x) => BigInt(Math.floor((15 * x) + (2 * (1.1 ** x))))
  },

  [Building.GuildHall]: {
    description: 'Recruit heroes to your cause.',
    levelCost: (x) => BigInt(Math.floor((500 * x) + (1.5 * (1.3 ** x))))
  },

  [Building.Armory]: {
    description: 'Create better gear for your heroes.',
    requires: {
      [Building.GuildHall]: 1
    },
    levelCost: (x) => BigInt(Math.floor((250 * x) + (3 * (1.25 ** x))))
  },

  [Building.Alchemist]: {
    description: 'Create better potions for your heroes.',
    requires: {
      [Building.GuildHall]: 1
    },
    levelCost: (x) => BigInt(Math.floor((350 * x) + (2 * (1.25 ** x))))
  },

  [Building.Inn]: {
    description: 'Allow your heroes to regain their stamina more quickly after an adventure.',
    requires: {
      [Building.GuildHall]: 1
    },
    levelCost: (x) => BigInt(Math.floor((650 * x) + (1.5 * (1.32 ** x))))
  },

  [Building.Bazaar]: {
    description: 'Allow your heroes to buy items before an adventure.',
    requires: {
      [Building.Armory]: 1,
      [Building.Alchemist]: 1,
    },
    levelCost: (x) => BigInt(Math.floor((875 * x) + (5 * (1.2 ** x))))
  },

  [Building.Cave]: {
    description: 'Allow your heroes to go on adventures',
    requires: {
      [Building.GuildHall]: 1
    },
    levelCost: (x) => BigInt(Math.floor((500 * x) + (1.2 * (1.35 ** x))))
  }
};
