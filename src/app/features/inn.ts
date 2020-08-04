import { BuildingFeature, BuildingFeatureTime, TownStat, HeroJob } from '../interfaces';

export const InnFeatures: BuildingFeature[] = [
  {
    name: 'Restful Sleep',
    description: 'Heroes rest faster.',
    cost: 150000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 10
  },
  {
    name: 'Blissful Sleep',
    description: 'Heroes rest even faster.',
    cost: 350000n,
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 25,
    requiresFeature: {
      'Restful Sleep': 1
    }
  },
  {
    name: 'Super Sleep',
    description: 'Heroes rest super fast.',
    cost: 10000000n,
    upgradeTime: BuildingFeatureTime.Medium,
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
    requiresFeature: {
      'Super Sleep': 1
    },
    requiresTownStat: {
      [`${TownStat.Retires}.${HeroJob.Adventurer}`]: 15
    }
  },
];