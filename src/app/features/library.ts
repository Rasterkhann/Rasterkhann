import { BuildingFeature, BuildingFeatureTime, TownStat, HeroJob, featureCost, BuildingFeatureCost } from '../interfaces';

export const LibraryFeatures: BuildingFeature[] = [
  {
    name: 'Trait: ATK+',
    description: 'Heroes get more ATK.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 2,
    requiresFeature: {
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['ATK+', 'ATK-']
    }
  },
  {
    name: 'Trait: DEF+',
    description: 'Heroes get more DEF.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 4,
    requiresFeature: {
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['DEF+', 'DEF-']
    }
  },
  {
    name: 'Trait: STA+',
    description: 'Heroes get more STA.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 6,
    requiresFeature: {
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['STA+', 'STA-']
    }
  },
  {
    name: 'Trait: HP+',
    description: 'Heroes get more HP.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 8,
    requiresFeature: {
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['HP+']
    }
  },
  {
    name: 'Trait: SP+',
    description: 'Heroes get more SP.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 12,
    requiresFeature: {
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['SP+']
    }
  },
  {
    name: 'Dual Trait',
    description: 'Heroes can spawn with two traits.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 1
  },
  {
    name: 'Tri Trait',
    description: 'Heroes can spawn with three traits.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Long,
    requiresLevel: 35,
    requiresFeature: {
      'Dual Trait': 1
    }
  },
  {
    name: 'Trait: ATK+',
    description: 'Heroes get more ATK.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XShort,
    requiresLevel: 10,
    requiresFeature: {
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['ATK+', 'ATK-']
    }
  },
  {
    name: 'Trait: Strong',
    description: 'Heroes get more ATK.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 20,
    unlocks: {
      trait: ['Strong']
    }
  },
  {
    name: 'Trait: Fortified',
    description: 'Heroes get more DEF.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 17,
    unlocks: {
      trait: ['Fortified']
    }
  },
  {
    name: 'Trait: Healthy',
    description: 'Heroes get more HP.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 1,
    unlocks: {
      trait: ['Healthy']
    }
  },
  {
    name: 'Trait: Skilled',
    description: 'Heroes get more SP.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 5,
    unlocks: {
      trait: ['Skilled']
    }
  },
  {
    name: 'Trait: Advanced',
    description: 'Heroes get more LVL.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 10,
    unlocks: {
      trait: ['Advanced']
    }
  },
  {
    name: 'Trait: Active',
    description: 'Heroes get more STA.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 7,
    unlocks: {
      trait: ['Active']
    }
  },
  {
    name: 'Trait: Modest',
    description: 'Heroes get more GOLD.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 3,
    unlocks: {
      trait: ['Modest']
    }
  },
  {
    name: 'Trait: Experienced',
    description: 'Heroes need less EXP to level up.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 15,
    unlocks: {
      trait: ['Experienced']
    }
  },
  {
    name: 'Trait: Multi-armed',
    description: 'Heroes can hold an additional weapon.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 35,
    requiresFeature: {
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['Multi-armed']
    }
  },
  {
    name: 'Trait: Tiny Body',
    description: 'Heroes can wear an additional armor.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 25,
    requiresFeature: {
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['Tiny Body']
    }
  },
  {
    name: 'Trait: Big Satchel',
    description: 'Heroes can hold an additional potion.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 15,
    requiresFeature: {
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['Big Satchel']
    }
  },
  {
    name: 'Trait: Careful',
    description: 'Heroes use their armor more wisely.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 15,
    hide: true,
    requiresFeature: {
      'Fast Repair': 1,
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['Careful', 'Reckless']
    }
  },
  {
    name: 'Trait: Small Weapon Proficiency',
    description: 'Heroes can also use small weapons.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 7,
    requiresFeature: {
      'Small Weapons': 1,
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['Shuriken User', 'Katar User']
    }
  },
  {
    name: 'Trait: Martial Weapon Proficiency',
    description: 'Heroes can also use martial weapons.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 10,
    requiresFeature: {
      'Martial Weapons': 1,
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['Spear User', 'Mace User']
    }
  },
  {
    name: 'Trait: Ranged Weapon Proficiency',
    description: 'Heroes can also use ranged weapons.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 19,
    requiresFeature: {
      'Ranged Weapons': 1,
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['Longbow User', 'Shortbow User']
    }
  },
  {
    name: 'Trait: Magical Weapon Proficiency',
    description: 'Heroes can also use magical weapons.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 15,
    requiresFeature: {
      'Magical Weapons': 1,
      'Dual Trait': 1
    },
    unlocks: {
      trait: ['Staff User', 'Wand User']
    }
  },
  {
    name: 'Item Traits II',
    description: 'Unlock basic tier II item traits.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.Short,
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
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Medium,
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
    cost: featureCost(BuildingFeatureCost.XLarge),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 35,
    requiresFeature: {
      'Item Traits III': 1
    },
    requiresTownStat: {
      [`${TownStat.Retires}.${HeroJob.Cleric}`]: 5
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
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 25,
    requiresFeature: {
      'Item Traits II': 1
    },
    requiresTownStat: {
      [`${TownStat.Retires}.${HeroJob.Cleric}`]: 15
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
    cost: featureCost(BuildingFeatureCost.XLarge),
    upgradeTime: BuildingFeatureTime.Medium,
    requiresLevel: 45,
    requiresFeature: {
      'Item Traits Hybrids': 1
    },
    requiresTownStat: {
      [`${TownStat.Retires}.${HeroJob.Cleric}`]: 25
    },
    unlocks: {
      itemTrait: [
        'Superior', 'Lucky',
        'Awful', 'Destroyed', 'Terrible'
      ]
    }
  },
  {
    name: 'Shelf Space I',
    description: 'You can hold onto +1 skill books.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XXXShort,
    requiresLevel: 15
  },
  {
    name: 'Shelf Space II',
    description: 'You can hold onto +1 skill books.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 25,
    requiresFeature: {
      'Shelf Space I': 1
    }
  },
  {
    name: 'Library Loan I',
    description: 'You can peruse +1 skill books.',
    cost: featureCost(BuildingFeatureCost.Medium),
    upgradeTime: BuildingFeatureTime.XXXShort,
    requiresLevel: 20
  },
  {
    name: 'Library Loan II',
    description: 'You can peruse +1 skill books.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 35,
    requiresFeature: {
      'Library Loan I': 1
    }
  },
  {
    name: 'Mage Books',
    description: 'You can import books for Mages.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 10,
    requiresFeature: {
      'Job: Mage': 1
    }
  },
  {
    name: 'Thief Books',
    description: 'You can import books for Thieves.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 10,
    requiresFeature: {
      'Job: Thief': 1
    }
  },
  {
    name: 'Cleric Books',
    description: 'You can import books for Clerics.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 10,
    requiresFeature: {
      'Job: Cleric': 1
    }
  },
  {
    name: 'Warrior Books',
    description: 'You can import books for Warriors.',
    cost: featureCost(BuildingFeatureCost.Small),
    upgradeTime: BuildingFeatureTime.XXShort,
    requiresLevel: 10,
    requiresFeature: {
      'Job: Warrior': 1
    }
  },
  {
    name: 'Trait: Aged',
    description: 'Heroes can retire 50% sooner.',
    cost: featureCost(BuildingFeatureCost.Large),
    upgradeTime: BuildingFeatureTime.Short,
    requiresLevel: 60,
    requiresTownStat: {
      [TownStat.Retires]: 15
    },
    unlocks: {
      trait: ['Aged', 'Youthful']
    }
  },
];
