import { BuildingFeature } from '../interfaces';

export const LibraryFeatures: BuildingFeature[] = [
  {
    name: 'Trait: Strong',
    description: 'Heroes get more ATK.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 20,
    unlocks: {
      trait: ['Strong']
    }
  },
  {
    name: 'Trait: Fortified',
    description: 'Heroes get more DEF.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 17,
    unlocks: {
      trait: ['Fortified']
    }
  },
  {
    name: 'Trait: Healthy',
    description: 'Heroes get more HP.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 1,
    unlocks: {
      trait: ['Healthy']
    }
  },
  {
    name: 'Trait: Skilled',
    description: 'Heroes get more SP.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 5,
    unlocks: {
      trait: ['Skilled']
    }
  },
  {
    name: 'Trait: Advanced',
    description: 'Heroes get more LVL.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 10,
    unlocks: {
      trait: ['Advanced']
    }
  },
  {
    name: 'Trait: Active',
    description: 'Heroes get more STA.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 7,
    unlocks: {
      trait: ['Active']
    }
  },
  {
    name: 'Trait: Modest',
    description: 'Heroes get more GOLD.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 3,
    unlocks: {
      trait: ['Modest']
    }
  },
  {
    name: 'Trait: Experienced',
    description: 'Heroes need less EXP.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 15,
    unlocks: {
      trait: ['Experienced']
    }
  },
];
