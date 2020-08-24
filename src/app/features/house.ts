import { BuildingFeature, BuildingFeatureTime, TownStat, HeroJob, featureCost, BuildingFeatureCost } from '../interfaces';

export const HouseFeatures: BuildingFeature[] = [
  {
    name: 'Children',
    description: 'Each citizen gathers an additional 1 gold per tick.',
    cost: featureCost(BuildingFeatureCost.XXXSmall),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 5
  },
  {
    name: 'Another Child',
    description: 'Each citizen gathers an additional 1 gold per tick.',
    cost: featureCost(BuildingFeatureCost.XXSmall),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 20,
    requiresFeature: {
      Children: 1
    }
  },
  {
    name: 'Grown Children',
    description: 'Each citizen gathers an additional 2 gold per tick.',
    cost: featureCost(BuildingFeatureCost.XSmall),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 50,
    requiresFeature: {
      'Another Child': 1
    }
  },
  {
    name: 'Thievery',
    description: 'Each citizen "gathers" an additional 5 gold per tick.',
    cost: featureCost(BuildingFeatureCost.XXXLarge),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 55,
    requiresFeature: {
      'Grown Children': 1
    },
    requiresTownStat: {
      [`${TownStat.Retires}.${HeroJob.Thief}`]: 15
    }
  }
];
