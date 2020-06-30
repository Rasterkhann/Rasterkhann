import { BuildingFeature } from '../interfaces';

export const HouseFeatures: BuildingFeature[] = [
  {
    name: 'Children',
    description: 'Each citizen gathers an additional 1 gold per tick.',
    cost: 5000n,
    upgradeTime: 3600,
    requiresLevel: 5
  },
  {
    name: 'Another Child',
    description: 'Each citizen gathers an additional 1 gold per tick.',
    cost: 15000n,
    upgradeTime: 7200,
    requiresLevel: 20,
    requiresFeature: {
      Children: 1
    }
  },
  {
    name: 'Grown Children',
    description: 'Each citizen gathers an additional 2 gold per tick.',
    cost: 25000n,
    upgradeTime: 14400,
    requiresLevel: 50,
    requiresFeature: {
      'Another Child': 1
    }
  }
];
