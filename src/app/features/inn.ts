import { BuildingFeature, BuildingFeatureTime } from '../interfaces';

export const InnFeatures: BuildingFeature[] = [
  {
    name: 'Restful Sleep',
    description: 'Heroes rest faster.',
    cost: 150000n,
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 10
  },
  {
    name: 'Blissful Sleep',
    description: 'Heroes rest even faster.',
    cost: 350000n,
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 25,
    requiresFeature: {
      'Restful Sleep': 1
    }
  },
];
