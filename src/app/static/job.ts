
import { species } from 'fantastical';

import { HeroJobStatic, HeroJob, HeroStat } from '../interfaces';

export const JobEffects: Record<HeroJob, HeroJobStatic> = {
  [HeroJob.Adventurer]: {
    description: 'Standard adventuring class. Balanced stats.',
    chooseName: () => species.human(),
    sprites: [
      'adventurer_f1', 'adventurer_f2', 'adventurer_f3', 'adventurer_f4',
      'adventurer_m1', 'adventurer_m2', 'adventurer_m3', 'adventurer_m4'
    ],
    statBaseMultiplier: {
      [HeroStat.LVL]: 1,
      [HeroStat.EXP]: 1,
      [HeroStat.HP]: 1,
      [HeroStat.SP]: 1,
      [HeroStat.ATK]: 1,
      [HeroStat.DEF]: 1,
      [HeroStat.STA]: 1,
      [HeroStat.GOLD]: 1
    },
    statGrowth: {
      [HeroStat.LVL]: () => 1,
      [HeroStat.EXP]: () => 100,
      [HeroStat.HP]: () => 20,
      [HeroStat.SP]: () => 10,
      [HeroStat.ATK]: () => 1,
      [HeroStat.DEF]: () => 1,
      [HeroStat.STA]: () => 5,
      [HeroStat.GOLD]: () => 3
    },
    triggers: {}
  },

  [HeroJob.Cleric]: {
    description: 'Combat healer. Post-combat revives.',
    chooseName: () => species.human(),
    sprites: ['cleric1', 'cleric2', 'cleric3', 'cleric4'],
    statBaseMultiplier: {
      [HeroStat.LVL]: 1,
      [HeroStat.EXP]: 1,
      [HeroStat.HP]: 1,
      [HeroStat.SP]: 1,
      [HeroStat.ATK]: 1,
      [HeroStat.DEF]: 1.3,
      [HeroStat.STA]: 1,
      [HeroStat.GOLD]: 1
    },
    statGrowth: {
      [HeroStat.LVL]: () => 1,
      [HeroStat.EXP]: () => 125,
      [HeroStat.HP]: () => 5,
      [HeroStat.SP]: () => 3,
      [HeroStat.ATK]: () => 1,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 5,
      [HeroStat.GOLD]: () => 5
    },
    triggers: {}
  },

  [HeroJob.Mage]: {
    description: 'AoE specialist. Pre-combat spread.',
    chooseName: () => species.human(),
    sprites: ['mage1', 'mage2', 'mage3', 'mage4'],
    statBaseMultiplier: {
      [HeroStat.LVL]: 1,
      [HeroStat.EXP]: 150,
      [HeroStat.HP]: 1,
      [HeroStat.SP]: 1,
      [HeroStat.ATK]: 1.4,
      [HeroStat.DEF]: 1,
      [HeroStat.STA]: 1,
      [HeroStat.GOLD]: 1
    },
    statGrowth: {
      [HeroStat.LVL]: () => 1,
      [HeroStat.EXP]: () => 1,
      [HeroStat.HP]: () => 5,
      [HeroStat.SP]: () => 1,
      [HeroStat.ATK]: () => 3,
      [HeroStat.DEF]: () => 1,
      [HeroStat.STA]: () => 4,
      [HeroStat.GOLD]: () => 10
    },
    triggers: {}
  },

  [HeroJob.Thief]: {
    description: 'Sneaky robber. Post-combat gold.',
    chooseName: () => species.human(),
    sprites: ['thief1', 'thief2', 'thief3', 'thief4'],
    statBaseMultiplier: {
      [HeroStat.LVL]: 1,
      [HeroStat.EXP]: 110,
      [HeroStat.HP]: 1,
      [HeroStat.SP]: 1,
      [HeroStat.ATK]: 1,
      [HeroStat.DEF]: 1,
      [HeroStat.STA]: 1,
      [HeroStat.GOLD]: 2
    },
    statGrowth: {
      [HeroStat.LVL]: () => 1,
      [HeroStat.EXP]: () => 1,
      [HeroStat.HP]: () => 7,
      [HeroStat.SP]: () => 5,
      [HeroStat.ATK]: () => 2,
      [HeroStat.DEF]: () => 1,
      [HeroStat.STA]: () => 3,
      [HeroStat.GOLD]: () => 100
    },
    triggers: {}
  },

  [HeroJob.Warrior]: {
    description: 'Powerful damager. Pre-combat nukes.',
    chooseName: () => species.human(),
    sprites: ['warrior1', 'warrior2', 'warrior3', 'warrior4'],
    statBaseMultiplier: {
      [HeroStat.LVL]: 1,
      [HeroStat.EXP]: 1,
      [HeroStat.HP]: 1,
      [HeroStat.SP]: 1,
      [HeroStat.ATK]: 1.3,
      [HeroStat.DEF]: 1,
      [HeroStat.STA]: 1,
      [HeroStat.GOLD]: 1
    },
    statGrowth: {
      [HeroStat.LVL]: () => 1,
      [HeroStat.EXP]: () => 200,
      [HeroStat.HP]: () => 15,
      [HeroStat.SP]: () => 1,
      [HeroStat.ATK]: () => 2,
      [HeroStat.DEF]: () => 1,
      [HeroStat.STA]: () => 2,
      [HeroStat.GOLD]: () => 15
    },
    triggers: {}
  }
};
