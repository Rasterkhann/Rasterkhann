import { BuildingFeature, BuildingFeatureTime, TownStat, featureCost, BuildingFeatureCost } from '../interfaces';

export const CaveFeatures: BuildingFeature[] = [
  {
    name: 'Monster Gold I',
    description: 'Monsters give 30% more gold.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 15
  },
  {
    name: 'Monster Gold II',
    description: 'Monsters give 30% more gold.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 35,
    requiresFeature: {
      'Monster Gold I': 1
    }
  },
  {
    name: 'Monster Gold III',
    description: 'Monsters give 30% more gold.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 60,
    requiresFeature: {
      'Monster Gold II': 1
    }
  },
  {
    name: 'Monster Experience I',
    description: 'Monsters give 30% more experience.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 30
  },
  {
    name: 'Monster Experience II',
    description: 'Monsters give 30% more experience.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 50,
    requiresFeature: {
      'Monster Experience I': 1
    }
  },
  {
    name: 'Monster Experience III',
    description: 'Monsters give 30% more experience.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 75,
    requiresFeature: {
      'Monster Experience II': 1
    }
  },
  {
    name: 'Tunnels I',
    description: 'Can be on +1 adventure simultaneously.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 5
  },
  {
    name: 'Tunnels II',
    description: 'Can be on +1 adventure simultaneously.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 25,
    requiresFeature: {
      'Tunnels I': 1
    }
  },
  {
    name: 'Infestation I',
    description: '+1 adventure options are present.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 20
  },
  {
    name: 'Infestation II',
    description: '+1 adventure options are present.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 50,
    requiresFeature: {
      'Infestation I': 1
    }
  },
  {
    name: 'Deeper Cave I',
    description: 'More potential encounters in an adventure.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 30
  },
  {
    name: 'Deeper Cave II',
    description: 'More potential encounters in an adventure.',
    cost: featureCost(BuildingFeatureCost.XLarge),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 60,
    requiresFeature: {
      'Deeper Cave I': 1
    }
  },
  {
    name: 'Teamwork I',
    description: 'Heroes can form a team of two in an adventure.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 10
  },
  {
    name: 'Teamwork II',
    description: 'Heroes can form a team of three in an adventure.',
    cost: featureCost(BuildingFeatureCost.XLarge),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 40,
    requiresFeature: {
      'Teamwork I': 1
    }
  },
  {
    name: 'Tougher Adventures I',
    description: 'Unlock the "Tough" difficulty for adventures.',
    cost: featureCost(BuildingFeatureCost.XLarge),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 45,
    requiresTownStat: {
      [TownStat.Retires]: 5
    }
  },
  {
    name: 'Tougher Adventures II',
    description: 'Unlock the "Challenging" difficulty for adventures.',
    cost: featureCost(BuildingFeatureCost.XXLarge),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 50,
    requiresTownStat: {
      [TownStat.Retires]: 25
    }
  },
  {
    name: 'Tougher Adventures III',
    description: 'Unlock the "Extreme" difficulty for adventures.',
    cost: featureCost(BuildingFeatureCost.XXXLarge),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 55,
    requiresTownStat: {
      [TownStat.Retires]: 75
    }
  },
];
