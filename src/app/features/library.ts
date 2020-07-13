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
    description: 'Heroes need less EXP to level up.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 15,
    unlocks: {
      trait: ['Experienced']
    }
  },
  {
    name: 'Trait: Multi-armed',
    description: 'Heroes can hold an additional weapon.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 35,
    unlocks: {
      trait: ['Multi-armed']
    }
  },
  {
    name: 'Trait: Tiny Body',
    description: 'Heroes can wear an additional armor.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 25,
    unlocks: {
      trait: ['Tiny Body']
    }
  },
  {
    name: 'Trait: Big Satchel',
    description: 'Heroes can hold an additional potion.',
    cost: 100000n,
    upgradeTime: 3600,
    requiresLevel: 15,
    unlocks: {
      trait: ['Big Satchel']
    }
  },
  {
    name: 'Item Traits II',
    description: 'Unlock basic tier II item traits.',
    cost: 250000n,
    upgradeTime: 1200,
    requiresLevel: 5,
    unlocks: {
      itemTrait: [
        'Guarding', 'Spiked', 'Rash', 'Powerful', 'Arcane',
        'Tiny', 'Sluggish'
      ]
    }
  },
  {
    name: 'Item Traits III',
    description: 'Unlock advanced tier III item traits.',
    cost: 500000n,
    upgradeTime: 2400,
    requiresLevel: 15,
    requiresFeature: {
      'Item Traits II': 1
    },
    unlocks: {
      itemTrait: [
        'Armored', 'Angry', 'Intrepid', 'Staunch', 'Mystic',
        'Dull', 'Broken'
      ]
    }
  },
  {
    name: 'Item Traits IV',
    description: 'Unlock powerful tier IV item traits.',
    cost: 1000000n,
    upgradeTime: 3600,
    requiresLevel: 35,
    requiresFeature: {
      'Item Traits III': 1
    },
    unlocks: {
      itemTrait: [
        'Warding', 'Menacing', 'Violent', 'Salubrious', 'Celestial'
      ]
    }
  },
  {
    name: 'Item Traits Hybrids',
    description: 'Unlock hybrid item traits.',
    cost: 500000n,
    upgradeTime: 3600,
    requiresLevel: 25,
    requiresFeature: {
      'Item Traits II': 1
    },
    unlocks: {
      itemTrait: [
        'Forceful', 'Keen', 'Precise', 'Sharp', 'Demonic', 'Deadly', 'Hurtful', 'Dangerous', 'Savage',
        'Murderous', 'Zealous', 'Large', 'Massive', 'Gigantic', 'Adept', 'Manic', 'Pointy', 'Strong',
        'Quick', 'Masterful',
        'Deranged', 'Inept', 'Bad', 'Shoddy'
      ]
    }
  },
  {
    name: 'Item Traits Hybrids II',
    description: 'Unlock stronger hybrid item traits.',
    cost: 1000000n,
    upgradeTime: 4800,
    requiresLevel: 45,
    requiresFeature: {
      'Item Traits Hybrids': 1
    },
    unlocks: {
      itemTrait: [
        'Superior', 'Lucky',
        'Awful', 'Destroyed', 'Terrible'
      ]
    }
  },
];
