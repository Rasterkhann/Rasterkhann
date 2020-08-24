import { BuildingFeature, BuildingFeatureTime, TownStat, HeroJob, BuildingFeatureCost, featureCost } from '../interfaces';

export const BazaarFeatures: BuildingFeature[] = [
  {
    name: 'Better Prices',
    description: 'Your items cost 10% more.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 5
  },
  {
    name: 'Even Better Prices',
    description: 'Your items cost 10% more.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 15,
    requiresFeature: {
      'Better Prices': 1
    }
  },
  {
    name: 'Higher Prices',
    description: 'Your items cost 10% more.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 25,
    requiresFeature: {
      'Even Better Prices': 1
    }
  },
  {
    name: 'Even Higher Prices',
    description: 'Your items cost 10% more.',
    cost: featureCost(BuildingFeatureCost.XLarge),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 35,
    requiresFeature: {
      'Higher Prices': 1
    }
  },
  {
    name: 'Stronger Prices',
    description: 'Your items cost 10% more.',
    cost: featureCost(BuildingFeatureCost.XXLarge),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 45,
    requiresFeature: {
      'Even Higher Prices': 1
    }
  },
  {
    name: 'Highway Robbery',
    description: 'Imagine a world where Thieves run your market - costs go up by 25%.',
    cost: featureCost(BuildingFeatureCost.XXXLarge),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 55,
    requiresFeature: {
      'Stronger Prices': 1
    },
    requiresTownStat: {
      [`${TownStat.Retires}.${HeroJob.Thief}`]: 25
    }
  },
];
