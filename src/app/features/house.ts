import { BuildingFeature, BuildingFeatureTime, TownStat, HeroJob } from '../interfaces';

export const HouseFeatures: BuildingFeature[] = [
  {
    name: 'Children',
    description: 'Each citizen gathers an additional 1 gold per tick.',
    cost: 5000n,
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 5
  },
  {
    name: 'Another Child',
    description: 'Each citizen gathers an additional 1 gold per tick.',
    cost: 15000n,
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 20,
    requiresFeature: {
      Children: 1
    }
  },
  {
    name: 'Grown Children',
    description: 'Each citizen gathers an additional 2 gold per tick.',
    cost: 25000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 50,
    requiresFeature: {
      'Another Child': 1
    }
  },
  {
    name: 'Thievery',
    description: 'Each citizen "gathers" an additional 5 gold per tick.',
    cost: 10000000n,
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
