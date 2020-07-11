import { BuildingFeature } from '../interfaces';

export const ArmoryFeatures: BuildingFeature[] = [
  {
    name: 'More Armors I',
    description: 'More armors are available for sale at once.',
    cost: 0n,
    upgradeTime: 600,
    requiresLevel: 3
  },
  {
    name: 'More Armors II',
    description: 'More armors are available for sale at once.',
    cost: 0n,
    upgradeTime: 600,
    requiresLevel: 15,
    requiresFeature: {
      'More Armors I': 1
    }
  },
  {
    name: 'More Armors III',
    description: 'More armors are available for sale at once.',
    cost: 0n,
    upgradeTime: 600,
    requiresLevel: 33,
    requiresFeature: {
      'More Armors II': 1
    }
  },
  {
    name: 'Faster Armor Creation I',
    description: 'Armors are created more frequently.',
    cost: 0n,
    upgradeTime: 1200,
    requiresLevel: 5
  },
  {
    name: 'Faster Armor Creation II',
    description: 'Armors are created more frequently.',
    cost: 0n,
    upgradeTime: 1200,
    requiresLevel: 19,
    requiresFeature: {
      'Faster Armor Creation I': 1
    }
  },
  {
    name: 'Faster Armor Creation III',
    description: 'Armors are created more frequently.',
    cost: 0n,
    upgradeTime: 1200,
    requiresLevel: 36,
    requiresFeature: {
      'Faster Armor Creation II': 1
    }
  },
  {
    name: 'More Weapons I',
    description: 'More weapons are available for sale at once.',
    cost: 100000n,
    upgradeTime: 600,
    requiresLevel: 3
  },
  {
    name: 'More Weapons II',
    description: 'More weapons are available for sale at once.',
    cost: 400000n,
    upgradeTime: 600,
    requiresLevel: 15,
    requiresFeature: {
      'More Weapons I': 1
    }
  },
  {
    name: 'More Weapons III',
    description: 'More weapons are available for sale at once.',
    cost: 750000n,
    upgradeTime: 600,
    requiresLevel: 33,
    requiresFeature: {
      'More Weapons II': 1
    }
  },
  {
    name: 'Faster Weapon Creation I',
    description: 'Weapons are created more frequently.',
    cost: 75000n,
    upgradeTime: 1200,
    requiresLevel: 5
  },
  {
    name: 'Faster Weapon Creation II',
    description: 'Weapons are created more frequently.',
    cost: 300000n,
    upgradeTime: 1200,
    requiresLevel: 19,
    requiresFeature: {
      'Faster Weapon Creation I': 1
    }
  },
  {
    name: 'Faster Weapon Creation III',
    description: 'Weapons are created more frequently.',
    cost: 650000n,
    upgradeTime: 1200,
    requiresLevel: 36,
    requiresFeature: {
      'Faster Weapon Creation II': 1
    }
  },
  {
    name: 'Martial Weapons',
    description: 'Spears and maces can be created.',
    cost: 500000n,
    upgradeTime: 7200,
    requiresLevel: 7
  },
  {
    name: 'Ranged Weapons',
    description: 'Longbows and shortbows can be created.',
    cost: 500000n,
    upgradeTime: 7200,
    requiresLevel: 12
  },
  {
    name: 'Small Weapons',
    description: 'Shuriken and katars can be created.',
    cost: 500000n,
    upgradeTime: 7200,
    requiresLevel: 14
  },
  {
    name: 'Magical Weapons',
    description: 'Staves and wands can be created.',
    cost: 500000n,
    upgradeTime: 7200,
    requiresLevel: 7
  },
  {
    name: 'Shadetin Weapons',
    description: 'Shadetin weapons can be created.',
    cost: 500000n,
    upgradeTime: 7200,
    requiresLevel: 10
  },
  {
    name: 'Darksteel Weapons',
    description: 'Darksteel weapons can be created.',
    cost: 500000n,
    upgradeTime: 7200,
    requiresLevel: 20
  },
  {
    name: 'Brightgold Weapons',
    description: 'Brightgold weapons can be created.',
    cost: 500000n,
    upgradeTime: 7200,
    requiresLevel: 30
  },
  {
    name: 'Obsidiron Weapons',
    description: 'Obsidiron weapons can be created.',
    cost: 500000n,
    upgradeTime: 7200,
    requiresLevel: 40
  },
  {
    name: 'Melfrost Weapons',
    description: 'Melfrost weapons can be created.',
    cost: 500000n,
    upgradeTime: 7200,
    requiresLevel: 50
  },
];
