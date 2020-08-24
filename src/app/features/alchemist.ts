import { BuildingFeature, BuildingFeatureTime, TownStat, HeroJob, featureCost, BuildingFeatureCost } from '../interfaces';

export const AlchemistFeatures: BuildingFeature[] = [
  {
    name: 'More Potions I',
    description: '+2 potions for sale at the Bazaar.',
    cost: featureCost(BuildingFeatureCost.XSmall),
    upgradeTime: BuildingFeatureTime.XXXShort,
    requiresLevel: 3
  },
  {
    name: 'More Potions II',
    description: '+2 potions for sale at the Bazaar.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 15,
    requiresFeature: {
      'More Potions I': 1
    }
  },
  {
    name: 'More Potions III',
    description: '+2 potions for sale at the Bazaar.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 33,
    requiresFeature: {
      'More Potions II': 1
    }
  },
  {
    name: 'Faster Potion Creation I',
    description: 'Potions are created 2.5min faster.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 5
  },
  {
    name: 'Faster Potion Creation II',
    description: 'Potions are created 2.5min faster.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 19,
    requiresFeature: {
      'Faster Potion Creation I': 1
    }
  },
  {
    name: 'Faster Potion Creation III',
    description: 'Potions are created 2.5min faster.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 36,
    requiresFeature: {
      'Faster Potion Creation II': 1
    }
  },
  {
    name: 'Health Potions I',
    description: 'Better Health Potions are created.',
    cost: 1n,
    upgradeTime: 1,
    requiresLevel: 1
  },
  {
    name: 'Health Potions II',
    description: 'Better Health Potions are created.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 10
  },
  {
    name: 'Health Potions III',
    description: 'Better Health Potions are created.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 23,
    requiresFeature: {
      'Health Potions II': 1
    }
  },
  {
    name: 'Health Potions IV',
    description: 'Better Health Potions are created.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 35,
    requiresFeature: {
      'Health Potions III': 1
    }
  },
  {
    name: 'Health Potions V',
    description: 'Better Health Potions are created.',
    cost: featureCost(BuildingFeatureCost.XLarge),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 47,
    requiresFeature: {
      'Health Potions IV': 1
    }
  },
  {
    name: 'Stamina Potions I',
    description: 'Stamina Potions can be created.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 7
  },
  {
    name: 'Stamina Potions II',
    description: 'Better Stamina Potions are created.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 15,
    requiresFeature: {
      'Stamina Potions I': 1
    }
  },
  {
    name: 'Stamina Potions III',
    description: 'Better Stamina Potions are created.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 27,
    requiresFeature: {
      'Stamina Potions II': 1
    }
  },
  {
    name: 'Stamina Potions IV',
    description: 'Better Stamina Potions are created.',
    cost: featureCost(BuildingFeatureCost.XLarge),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 39,
    requiresFeature: {
      'Stamina Potions III': 1
    }
  },
  {
    name: 'Stamina Potions V',
    description: 'Better Stamina Potions are created.',
    cost: featureCost(BuildingFeatureCost.XXLarge),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 51,
    requiresFeature: {
      'Stamina Potions IV': 1
    }
  },
  {
    name: 'Skill Potions I',
    description: 'Skill Potions can be created.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 9
  },
  {
    name: 'Skill Potions II',
    description: 'Better Skill Potions are created.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 17,
    requiresFeature: {
      'Skill Potions I': 1
    }
  },
  {
    name: 'Skill Potions III',
    description: 'Better Skill Potions are created.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 29,
    requiresFeature: {
      'Skill Potions II': 1
    }
  },
  {
    name: 'Skill Potions IV',
    description: 'Better Skill Potions are created.',
    cost: featureCost(BuildingFeatureCost.XLarge),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 42,
    requiresFeature: {
      'Skill Potions III': 1
    }
  },
  {
    name: 'Skill Potions V',
    description: 'Better Skill Potions are created.',
    cost: featureCost(BuildingFeatureCost.XXLarge),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 55,
    requiresFeature: {
      'Skill Potions IV': 1
    }
  },
  {
    name: 'Two-color Potions',
    description: 'Two-stat hybrid potions can be created.',
    cost: featureCost(BuildingFeatureCost.XXLarge),
    upgradeTime: BuildingFeatureTime.XLong,
    requiresLevel: 25,
    requiresFeature: {
      'Health Potions II': 1,
      'Skill Potions II': 1,
      'Stamina Potions II': 1
    },
    requiresTownStat: {
      [`${TownStat.Retires}.${HeroJob.Mage}`]: 5
    }
  },
  {
    name: 'Three-color Potions',
    description: 'Three-stat hybrid potions can be created.',
    cost: featureCost(BuildingFeatureCost.XXXLarge),
    upgradeTime: BuildingFeatureTime.XXLong,
    requiresLevel: 65,
    requiresFeature: {
      'Health Potions V': 1,
      'Skill Potions V': 1,
      'Stamina Potions V': 1
    },
    requiresTownStat: {
      [`${TownStat.Retires}.${HeroJob.Mage}`]: 25
    }
  },
];
