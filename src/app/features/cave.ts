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
];
