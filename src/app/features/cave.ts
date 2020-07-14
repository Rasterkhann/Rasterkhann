import { BuildingFeature } from '../interfaces';

export const CaveFeatures: BuildingFeature[] = [
  {
    name: 'Monster Gold I',
    description: 'Monsters give more gold.',
    cost: 50000n,
    upgradeTime: 1800,
    requiresLevel: 15
  },
  {
    name: 'Monster Gold II',
    description: 'Monsters give more gold.',
    cost: 150000n,
    upgradeTime: 3600,
    requiresLevel: 35,
    requiresFeature: {
      'Monster Gold I': 1
    }
  },
  {
    name: 'Monster Gold III',
    description: 'Monsters give more gold.',
    cost: 350000n,
    upgradeTime: 4800,
    requiresLevel: 60,
    requiresFeature: {
      'Monster Gold II': 1
    }
  },
  {
    name: 'Monster Experience I',
    description: 'Monsters give more experience.',
    cost: 50000n,
    upgradeTime: 1800,
    requiresLevel: 30
  },
  {
    name: 'Monster Experience II',
    description: 'Monsters give more experience.',
    cost: 250000n,
    upgradeTime: 3600,
    requiresLevel: 50,
    requiresFeature: {
      'Monster Experience I': 1
    }
  },
  {
    name: 'Monster Experience III',
    description: 'Monsters give more experience.',
    cost: 450000n,
    upgradeTime: 3600,
    requiresLevel: 75,
    requiresFeature: {
      'Monster Experience II': 1
    }
  },
  {
    name: 'Tunnels I',
    description: 'Can be on another adventure simultaneously.',
    cost: 100000n,
    upgradeTime: 7200,
    requiresLevel: 5
  },
  {
    name: 'Tunnels II',
    description: 'Can be on another adventure simultaneously.',
    cost: 300000n,
    upgradeTime: 10800,
    requiresLevel: 25,
    requiresFeature: {
      'Tunnels I': 1
    }
  },
  {
    name: 'Infestation I',
    description: 'More adventure options are present.',
    cost: 300000n,
    upgradeTime: 5400,
    requiresLevel: 20
  },
  {
    name: 'Infestation II',
    description: 'More adventure options are present.',
    cost: 500000n,
    upgradeTime: 10800,
    requiresLevel: 50,
    requiresFeature: {
      'Infestation I': 1
    }
  },
  {
    name: 'Deeper Cave I',
    description: 'More potential encounters in an adventure.',
    cost: 400000n,
    upgradeTime: 10800,
    requiresLevel: 30
  },
  {
    name: 'Deeper Cave II',
    description: 'More potential encounters in an adventure.',
    cost: 600000n,
    upgradeTime: 14400,
    requiresLevel: 60,
    requiresFeature: {
      'Deeper Cave I': 1
    }
  },
];
