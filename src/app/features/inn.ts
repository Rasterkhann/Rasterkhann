import { BuildingFeature, BuildingFeatureTime, TownStat, HeroJob, featureCost, BuildingFeatureCost } from '../interfaces';

export const InnFeatures: BuildingFeature[] = [
  {
    name: 'Restful Sleep',
    description: 'Heroes rest faster.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 10
  },
  {
    name: 'Blissful Sleep',
    description: 'Heroes rest even faster.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 25,
    requiresFeature: {
      'Restful Sleep': 1
    }
  },
  {
    name: 'Super Sleep',
    description: 'Heroes rest super fast.',
    cost: featureCost(BuildingFeatureCost.XXXLarge),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 35,
    requiresFeature: {
      'Blissful Sleep': 1
    },
    requiresTownStat: {
      [`${TownStat.Retires}.${HeroJob.Adventurer}`]: 5
    }
  },
  {
    name: 'Mega Sleep',
    description: 'Heroes rest mega fast.',
    cost: 10000000n,
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 45,
    requiresFeature: {
      'Super Sleep': 1
    },
    requiresTownStat: {
      [`${TownStat.Retires}.${HeroJob.Adventurer}`]: 15
    }
  },
];
