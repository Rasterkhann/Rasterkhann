import { BuildingFeature } from '../interfaces';

export const AlchemistFeatures: BuildingFeature[] = [
  {
    name: 'More Potions I',
    description: 'More potions are available for sale at once.',
    cost: 25000n,
    upgradeTime: 600,
    requiresLevel: 3
  },
  {
    name: 'More Potions II',
    description: 'More potions are available for sale at once.',
    cost: 125000n,
    upgradeTime: 600,
    requiresLevel: 15,
    requiresFeature: {
      'More Potions I': 1
    }
  },
  {
    name: 'More Potions III',
    description: 'More potions are available for sale at once.',
    cost: 325000n,
    upgradeTime: 600,
    requiresLevel: 33,
    requiresFeature: {
      'More Potions II': 1
    }
  },
  {
    name: 'Faster Potion Creation I',
    description: 'Potions are created more frequently.',
    cost: 50000n,
    upgradeTime: 1200,
    requiresLevel: 5
  },
  {
    name: 'Faster Potion Creation II',
    description: 'Potions are created more frequently.',
    cost: 250000n,
    upgradeTime: 1200,
    requiresLevel: 19,
    requiresFeature: {
      'Faster Potion Creation I': 1
    }
  },
  {
    name: 'Faster Potion Creation III',
    description: 'Potions are created more frequently.',
    cost: 500000n,
    upgradeTime: 1200,
    requiresLevel: 36,
    requiresFeature: {
      'Faster Potion Creation II': 1
    }
  },
  {
    name: 'Health Potions II',
    description: 'Better Health Potions are created.',
    cost: 150000n,
    upgradeTime: 2400,
    requiresLevel: 10
  },
  {
    name: 'Health Potions III',
    description: 'Better Health Potions are created.',
    cost: 350000n,
    upgradeTime: 2400,
    requiresLevel: 23,
    requiresFeature: {
      'Health Potions II': 1
    }
  },
  {
    name: 'Health Potions IV',
    description: 'Better Health Potions are created.',
    cost: 750000n,
    upgradeTime: 2400,
    requiresLevel: 35,
    requiresFeature: {
      'Health Potions III': 1
    }
  },
  {
    name: 'Health Potions V',
    description: 'Better Health Potions are created.',
    cost: 1250000n,
    upgradeTime: 2400,
    requiresLevel: 47,
    requiresFeature: {
      'Health Potions IV': 1
    }
  },
  {
    name: 'Stamina Potions I',
    description: 'Stamina Potions can be created.',
    cost: 75000n,
    upgradeTime: 2400,
    requiresLevel: 7
  },
  {
    name: 'Stamina Potions II',
    description: 'Better Stamina Potions are created.',
    cost: 250000n,
    upgradeTime: 2400,
    requiresLevel: 15,
    requiresFeature: {
      'Stamina Potions I': 1
    }
  },
  {
    name: 'Stamina Potions III',
    description: 'Better Stamina Potions are created.',
    cost: 650000n,
    upgradeTime: 2400,
    requiresLevel: 27,
    requiresFeature: {
      'Stamina Potions II': 1
    }
  },
  {
    name: 'Stamina Potions IV',
    description: 'Better Stamina Potions are created.',
    cost: 1150000n,
    upgradeTime: 2400,
    requiresLevel: 39,
    requiresFeature: {
      'Stamina Potions III': 1
    }
  },
  {
    name: 'Stamina Potions V',
    description: 'Better Stamina Potions are created.',
    cost: 1500000n,
    upgradeTime: 2400,
    requiresLevel: 51,
    requiresFeature: {
      'Stamina Potions IV': 1
    }
  },
  {
    name: 'Skill Potions I',
    description: 'Skill Potions can be created.',
    cost: 150000n,
    upgradeTime: 2400,
    requiresLevel: 9
  },
  {
    name: 'Skill Potions II',
    description: 'Better Skill Potions are created.',
    cost: 350000n,
    upgradeTime: 2400,
    requiresLevel: 17,
    requiresFeature: {
      'Skill Potions I': 1
    }
  },
  {
    name: 'Skill Potions III',
    description: 'Better Skill Potions are created.',
    cost: 750000n,
    upgradeTime: 2400,
    requiresLevel: 29,
    requiresFeature: {
      'Skill Potions II': 1
    }
  },
  {
    name: 'Skill Potions IV',
    description: 'Better Skill Potions are created.',
    cost: 1500000n,
    upgradeTime: 2400,
    requiresLevel: 42,
    requiresFeature: {
      'Skill Potions III': 1
    }
  },
  {
    name: 'Skill Potions V',
    description: 'Better Skill Potions are created.',
    cost: 2500000n,
    upgradeTime: 2400,
    requiresLevel: 55,
    requiresFeature: {
      'Skill Potions IV': 1
    }
  },
  {
    name: 'Two-color Potions',
    description: 'Two-stat hybrid potions can be created.',
    cost: 500000n,
    upgradeTime: 7200,
    requiresLevel: 25,
    requiresFeature: {
      'Health Potions II': 1,
      'Skill Potions II': 1,
      'Stamina Potions II': 1
    }
  },
  {
    name: 'Three-color Potions',
    description: 'Three-stat hybrid potions can be created.',
    cost: 1500000n,
    upgradeTime: 14400,
    requiresLevel: 65,
    requiresFeature: {
      'Health Potions V': 1,
      'Skill Potions V': 1,
      'Stamina Potions V': 1
    }
  },
];
