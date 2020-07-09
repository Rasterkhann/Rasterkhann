import { BuildingFeature } from '../interfaces';

export const LibraryFeatures: BuildingFeature[] = [
  {
    name: 'Trait: ATK+',
    description: 'Heroes get more ATK.',
    cost: 50000n,
    upgradeTime: 1800,
    requiresLevel: 2,
    unlocks: {
      trait: ['ATK+', 'ATK-']
    }
  },
  {
    name: 'Trait: DEF+',
    description: 'Heroes get more DEF.',
    cost: 50000n,
    upgradeTime: 1800,
    requiresLevel: 4,
    unlocks: {
      trait: ['DEF+', 'DEF-']
    }
  },
  {
    name: 'Trait: STA+',
    description: 'Heroes get more STA.',
    cost: 50000n,
    upgradeTime: 1800,
    requiresLevel: 6,
    unlocks: {
      trait: ['STA+', 'STA-']
    }
  },
  {
    name: 'Trait: HP+',
    description: 'Heroes get more HP.',
    cost: 50000n,
    upgradeTime: 1800,
    requiresLevel: 8,
    unlocks: {
      trait: ['HP+']
    }
  },
  {
    name: 'Trait: SP+',
    description: 'Heroes get more SP.',
    cost: 50000n,
    upgradeTime: 1800,
    requiresLevel: 12,
    unlocks: {
      trait: ['SP+']
    }
  },
  {
    name: 'Dual Trait',
    description: 'Heroes can spawn with two traits.',
    cost: 150000n,
    upgradeTime: 7200,
    requiresLevel: 1,
    requiresFeature: {
      'Trait: ATK+': 1,
      'Trait: DEF+': 1,
      'Trait: STA+': 1,
      'Trait: HP+': 1,
      'Trait: SP+': 1
    }
  },
  {
    name: 'Tri Trait',
    description: 'Heroes can spawn with three traits.',
    cost: 350000n,
    upgradeTime: 7200,
    requiresLevel: 35,
    requiresFeature: {
      'Dual Trait': 1
    }
  },
  {
    name: 'Trait: ATK+',
    description: 'Heroes get more ATK.',
    cost: 50000n,
    upgradeTime: 1800,
    requiresLevel: 10,
    unlocks: {
      trait: ['ATK+', 'ATK-']
    }
  },
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
