import { BuildingFeature, BuildingFeatureTime, HeroJob, featureCost, BuildingFeatureCost } from '../interfaces';

const JobFeatures: BuildingFeature[] = [
  {
    name: 'Job: Warrior',
    description: 'Unlock the Warrior job for your heroes.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 10,
    unlocks: {
      job: [HeroJob.Warrior]
    }
  },
  {
    name: 'Job: Thief',
    description: 'Unlock the Thief job for your heroes.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 20,
    unlocks: {
      job: [HeroJob.Thief]
    }
  },
  {
    name: 'Job: Mage',
    description: 'Unlock the Mage job for your heroes.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 30,
    unlocks: {
      job: [HeroJob.Mage]
    }
  },
  {
    name: 'Job: Cleric',
    description: 'Unlock the Cleric job for your heroes.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 30,
    unlocks: {
      job: [HeroJob.Cleric]
    }
  },
];

const HeroFeatures: BuildingFeature[] = [
  {
    name: 'Bigger Barracks I',
    description: 'House +1 hero.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 10
  },
  {
    name: 'Bigger Barracks II',
    description: 'House +1 hero.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 30,
    requiresFeature: {
      'Bigger Barracks I': 1
    }
  },
  {
    name: 'Enticing Army I',
    description: 'Show +1 potential hero to recruit.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 5
  },
  {
    name: 'Enticing Army II',
    description: 'Show +1 potential hero to recruit.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 25,
    requiresFeature: {
      'Enticing Army I': 1
    }
  },
];

const OtherFeatures: BuildingFeature[] = [
  {
    name: 'Cheaper Training I',
    description: 'Hero training costs go down by 10%.',
    cost: featureCost(BuildingFeatureCost.XSmall),
    upgradeTime: BuildingFeatureTime.XXXShort,
    requiresLevel: 15
  },
  {
    name: 'Cheaper Training II',
    description: 'Hero training costs go down 10% more.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 25,
    requiresFeature: {
      'Cheaper Training I': 1
    }
  },
  {
    name: 'Cheaper Training III',
    description: 'Hero training costs go down 10% more.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 35,
    requiresFeature: {
      'Cheaper Training II': 1
    }
  },
  {
    name: 'Cheaper Training IV',
    description: 'Hero training costs go down 10% more.',
    cost: featureCost(BuildingFeatureCost.XLarge),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 45,
    requiresFeature: {
      'Cheaper Training III': 1
    }
  },
  {
    name: 'Cheaper Training V',
    description: 'Hero training costs go down 10% more.',
    cost: featureCost(BuildingFeatureCost.XXLarge),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 55,
    requiresFeature: {
      'Cheaper Training IV': 1
    }
  },
];

export const GuildHallFeatures: BuildingFeature[] = [
  ...JobFeatures,
  ...HeroFeatures,
  ...OtherFeatures
];
