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
    cost: 0n,
    upgradeTime: 600,
    requiresLevel: 3
  },
  {
    name: 'More Weapons II',
    description: 'More weapons are available for sale at once.',
    cost: 0n,
    upgradeTime: 600,
    requiresLevel: 15,
    requiresFeature: {
      'More Weapons I': 1
    }
  },
  {
    name: 'More Weapons III',
    description: 'More weapons are available for sale at once.',
    cost: 0n,
    upgradeTime: 600,
    requiresLevel: 33,
    requiresFeature: {
      'More Weapons II': 1
    }
  },
  {
    name: 'Faster Weapon Creation I',
    description: 'Weapons are created more frequently.',
    cost: 0n,
    upgradeTime: 1200,
    requiresLevel: 5
  },
  {
    name: 'Faster Weapon Creation II',
    description: 'Weapons are created more frequently.',
    cost: 0n,
    upgradeTime: 1200,
    requiresLevel: 19,
    requiresFeature: {
      'Faster Weapon Creation I': 1
    }
  },
  {
    name: 'Faster Weapon Creation III',
    description: 'Weapons are created more frequently.',
    cost: 0n,
    upgradeTime: 1200,
    requiresLevel: 36,
    requiresFeature: {
      'Faster Weapon Creation II': 1
    }
  },
];
