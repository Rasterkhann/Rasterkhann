import { Building, BuildingStatic } from '../interfaces';
import { HouseFeatures, GuildHallFeatures, ArmoryFeatures,
  AlchemistFeatures, InnFeatures, CaveFeatures, BazaarFeatures, LibraryFeatures, WorkshopFeatures } from '../features';

const featuresArrayToHash = (array: any[]) => array.reduce((prev, cur) => ({ ...prev, [cur.name]: cur }), {});

export const BuildingData: Record<Building, BuildingStatic> = {
  [Building.TownHall]: {
    name: 'Town Hall',
    description: 'Build or upgrade your town.',
    upgradeTime: () => 0,
    levelCost: () => 0n,
    features: {}
  },

  [Building.Watchtower]: {
    name: 'Watchtower',
    description: 'Manage town settings here.',
    upgradeTime: () => 0,
    levelCost: () => 0n,
    features: {}
  },

  [Building.Workshop]: {
    name: 'Workshop',
    description: 'Manage your automation settings for your town.',
    upgradeTime: () => 30,
    levelCost: (x) => x === 1 ? 5000n : 0n,
    features: featuresArrayToHash(WorkshopFeatures)
  },

  [Building.Archives]: {
    name: 'Archives',
    description: 'View the news archives.',
    upgradeTime: () => 30,
    requires: {
      [Building.House]: 25
    },
    levelCost: (x) => x === 1 ? 50000n : 0n,
    features: {}
  },

  [Building.House]: {
    name: 'House',
    description: 'Acquire more citizens to increase your gold gain. Upgrades increase gold gained.',
    upgradeTime: (level) => level * 5,
    levelCost: (x) => BigInt(Math.floor((15 * x) + (2 * (1.25 ** x)))),
    features: featuresArrayToHash(HouseFeatures)
  },

  [Building.GuildHall]: {
    name: 'Guild Hall',
    description: 'Recruit heroes to your cause. Upgrades increase level of recruited heroes.',
    upgradeTime: (level) => level * 20,
    levelCost: (x) => BigInt(Math.floor((500 * x) + (1.5 * (1.3 ** x)))),
    features: featuresArrayToHash(GuildHallFeatures)
  },

  [Building.Armory]: {
    name: 'Armory',
    description: 'Create better gear for your heroes. Upgrades increase stat value of gear.',
    requires: {
      [Building.Bazaar]: 1,
      [Building.GuildHall]: 10
    },
    upgradeTime: (level) => level * 20,
    levelCost: (x) => BigInt(Math.floor((250 * x) + (3 * (1.25 ** x)))),
    features: featuresArrayToHash(ArmoryFeatures)
  },

  [Building.Alchemist]: {
    name: 'Alchemist',
    description: 'Create better potions for your heroes. Upgrades increase stat values of potions.',
    requires: {
      [Building.Bazaar]: 1,
      [Building.GuildHall]: 20
    },
    upgradeTime: (level) => level * 15,
    levelCost: (x) => BigInt(Math.floor((350 * x) + (2 * (1.25 ** x)))),
    features: featuresArrayToHash(AlchemistFeatures)
  },

  [Building.Inn]: {
    name: 'Inn',
    description: 'Allow your heroes to regain their stamina more quickly after an adventure. Upgrades increase cost for hero rest.',
    requires: {
      [Building.GuildHall]: 5
    },
    upgradeTime: (level) => level * 60,
    levelCost: (x) => BigInt(Math.floor((650 * x) + (1.5 * (1.32 ** x)))),
    features: featuresArrayToHash(InnFeatures)
  },

  [Building.Bazaar]: {
    name: 'Bazaar',
    description: 'Allow your heroes to buy items before an adventure. Upgrades increase the cost of items sold.',
    requires: {
      [Building.GuildHall]: 1
    },
    upgradeTime: (level) => level * 30,
    levelCost: (x) => BigInt(Math.floor((875 * x) + (5 * (1.2 ** x)))),
    features: featuresArrayToHash(BazaarFeatures)
  },

  [Building.Cave]: {
    name: 'Cave of Adventure',
    description: 'Allow your heroes to go on adventures. Upgrades increase the level of adventures found.',
    requires: {
      [Building.GuildHall]: 1
    },
    upgradeTime: (level) => level * 15,
    levelCost: (x) => BigInt(Math.floor((500 * x) + (1.2 * (1.35 ** x)))),
    features: featuresArrayToHash(CaveFeatures)
  },

  [Building.Library]: {
    name: 'Library',
    description: 'Research new traits and abilities for your heroes. Upgrades unlock new traits.',
    requires: {
      [Building.GuildHall]: 5
    },
    upgradeTime: (level) => level * 60,
    levelCost: (x) => BigInt(Math.floor((1000 * x) + (2 * (1.3 ** x)))),
    features: featuresArrayToHash(LibraryFeatures)
  }
};
