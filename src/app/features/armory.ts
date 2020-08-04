import { BuildingFeature, BuildingFeatureTime } from '../interfaces';

export const ArmoryFeatures: BuildingFeature[] = [
  {
    name: 'More Armors I',
    description: 'More armors are available for sale at once.',
    cost: 100000n,
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 3
  },
  {
    name: 'More Armors II',
    description: 'More armors are available for sale at once.',
    cost: 400000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 15,
    requiresFeature: {
      'More Armors I': 1
    }
  },
  {
    name: 'More Armors III',
    description: 'More armors are available for sale at once.',
    cost: 750000n,
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 33,
    requiresFeature: {
      'More Armors II': 1
    }
  },
  {
    name: 'Faster Armor Creation I',
    description: 'Armors are created more frequently.',
    cost: 75000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 5
  },
  {
    name: 'Faster Armor Creation II',
    description: 'Armors are created more frequently.',
    cost: 300000n,
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 19,
    requiresFeature: {
      'Faster Armor Creation I': 1
    }
  },
  {
    name: 'Faster Armor Creation III',
    description: 'Armors are created more frequently.',
    cost: 650000n,
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 36,
    requiresFeature: {
      'Faster Armor Creation II': 1
    }
  },
  {
    name: 'More Weapons I',
    description: 'More weapons are available for sale at once.',
    cost: 100000n,
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 3
  },
  {
    name: 'More Weapons II',
    description: 'More weapons are available for sale at once.',
    cost: 400000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 15,
    requiresFeature: {
      'More Weapons I': 1
    }
  },
  {
    name: 'More Weapons III',
    description: 'More weapons are available for sale at once.',
    cost: 750000n,
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 33,
    requiresFeature: {
      'More Weapons II': 1
    }
  },
  {
    name: 'Faster Weapon Creation I',
    description: 'Weapons are created more frequently.',
    cost: 75000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 5
  },
  {
    name: 'Faster Weapon Creation II',
    description: 'Weapons are created more frequently.',
    cost: 300000n,
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 19,
    requiresFeature: {
      'Faster Weapon Creation I': 1
    }
  },
  {
    name: 'Faster Weapon Creation III',
    description: 'Weapons are created more frequently.',
    cost: 650000n,
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 36,
    requiresFeature: {
      'Faster Weapon Creation II': 1
    }
  },
  {
    name: 'Martial Weapons',
    description: 'Spears and maces can be created.',
    cost: 500000n,
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 7,
    requiresFeature: {
      'Job: Warrior': 1
    }
  },
  {
    name: 'Ranged Weapons',
    description: 'Longbows and shortbows can be created.',
    cost: 500000n,
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 12
  },
  {
    name: 'Small Weapons',
    description: 'Shuriken and katars can be created.',
    cost: 500000n,
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 14,
    requiresFeature: {
      'Job: Thief': 1
    }
  },
  {
    name: 'Magical Weapons',
    description: 'Staves and wands can be created.',
    cost: 500000n,
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 7,
    requiresFeature: {
      'Job: Mage': 1
    }
  },
  {
    name: 'Shadetin Weapons',
    description: 'Shadetin weapons can be created.',
    cost: 500000n,
    upgradeTime: BuildingFeatureTime.XXLong,
    requiresLevel: 10
  },
  {
    name: 'Darksteel Weapons',
    description: 'Darksteel weapons can be created.',
    cost: 500000n,
    upgradeTime: BuildingFeatureTime.XXLong,
    requiresLevel: 20
  },
  {
    name: 'Brightgold Weapons',
    description: 'Brightgold weapons can be created.',
    cost: 500000n,
    upgradeTime: BuildingFeatureTime.XXLong,
    requiresLevel: 30
  },
  {
    name: 'Obsidiron Weapons',
    description: 'Obsidiron weapons can be created.',
    cost: 500000n,
    upgradeTime: BuildingFeatureTime.XXLong,
    requiresLevel: 40
  },
  {
    name: 'Melfrost Weapons',
    description: 'Melfrost weapons can be created.',
    cost: 500000n,
    upgradeTime: BuildingFeatureTime.XXLong,
    requiresLevel: 50
  },
  {
    name: 'Cloaks',
    description: 'Cloaks can now be created.',
    cost: 100000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 7
  },
  {
    name: 'Medium Armor',
    description: 'Medium armor can now be created.',
    cost: 300000n,
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 15
  },
  {
    name: 'Heavy Armor',
    description: 'Heavy armor can now be created.',
    cost: 550000n,
    upgradeTime: BuildingFeatureTime.XLong,
    requiresLevel: 25,
    requiresFeature: {
      'Job: Warrior': 1
    }
  },
  {
    name: 'Fast Repair',
    description: 'Item repair happens faster.',
    cost: 150000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 2,
    hide: true
  },
  {
    name: 'Faster Repair',
    description: 'Item repair happens even faster.',
    cost: 350000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 10,
    hide: true,
    requiresFeature: {
      'Fast Repair': 1
    }
  },
];
