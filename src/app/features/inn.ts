import { BuildingFeature } from '../interfaces';

export const InnFeatures: BuildingFeature[] = [
  {
    name: 'Restful Sleep',
    description: 'Heroes rest faster.',
    cost: 150000n,
    upgradeTime: 7200,
    requiresLevel: 10
  },
  {
    name: 'Blissful Sleep',
    description: 'Heroes rest even faster.',
    cost: 350000n,
    upgradeTime: 7200,
    requiresLevel: 25,
    requiresFeature: {
      'Restful Sleep': 1
    }
  },
];
