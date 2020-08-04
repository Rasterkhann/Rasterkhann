import { BuildingFeature, BuildingFeatureTime, TownStat, HeroJob } from '../interfaces';

export const BazaarFeatures: BuildingFeature[] = [
  {
    name: 'Better Prices',
    description: 'Your items cost more.',
    cost: 50000n,
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 5
  },
  {
    name: 'Even Better Prices',
    description: 'Your items cost more.',
    cost: 150000n,
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 15,
    requiresFeature: {
      'Better Prices': 1
    }
  },
  {
    name: 'Higher Prices',
    description: 'Your items cost more.',
    cost: 350000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 25,
    requiresFeature: {
      'Even Better Prices': 1
    }
  },
  {
    name: 'Even Higher Prices',
    description: 'Your items cost more.',
    cost: 650000n,
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 35,
    requiresFeature: {
      'Higher Prices': 1
    }
  },
  {
    name: 'Stronger Prices',
    description: 'Your items cost more.',
    cost: 1050000n,
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 45,
    requiresFeature: {
      'Even Higher Prices': 1
    }
  },
  {
    name: 'Highway Robbery',
    description: 'Imagine a world where Thieves run your market - costs go up.',
    cost: 10000000n,
    upgradeTime: BuildingFeatureTime.Long,
    requiresFeature: {
      'Stronger Prices': 1
    },
    requiresTownStat: {
      [`${TownStat.Retires}.${HeroJob.Thief}`]: 25
    }
  },
];
