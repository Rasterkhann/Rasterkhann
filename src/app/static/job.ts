
import { species } from 'fantastical';

import { HeroJobStatic, HeroJob, HeroStat, TriggerType } from '../interfaces';

import * as JobActions from './jobactions';

export const JobEffects: Record<HeroJob, HeroJobStatic> = {
  [HeroJob.Adventurer]: {
    description: 'Standard adventuring class. Balanced stats.',
    chooseName: () => species.human({ allowMultipleNames: true }),
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
      [HeroStat.HP]: () => 12,
      [HeroStat.SP]: () => 4,
      [HeroStat.ATK]: () => 2,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 4,
      [HeroStat.GOLD]: () => 50
    },
    triggers: {},
    combatTriggers: {},
    actions: [JobActions.Attack()]
  },

  [HeroJob.Cleric]: {
    description: 'Combat healer. Post-combat revives.',
    chooseName: () => species.human({ allowMultipleNames: true }),
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
      [HeroStat.HP]: () => 10,
      [HeroStat.SP]: () => 3,
      [HeroStat.ATK]: () => 2,
      [HeroStat.DEF]: () => 3,
      [HeroStat.STA]: () => 5,
      [HeroStat.GOLD]: () => 0
    },
    triggers: {},
    combatTriggers: {
      [TriggerType.PostCombat]: [JobActions.HealAllPercent(10)]
    },
    actions: [JobActions.Attack(), JobActions.Heal()]
  },

  [HeroJob.Mage]: {
    description: 'AoE specialist. Pre-combat spread.',
    chooseName: () => species.human({ allowMultipleNames: true }),
    sprites: ['mage1', 'mage2', 'mage3', 'mage4'],
    statBaseMultiplier: {
      [HeroStat.LVL]: 1,
      [HeroStat.EXP]: 1,
      [HeroStat.HP]: 1,
      [HeroStat.SP]: 1,
      [HeroStat.ATK]: 1.4,
      [HeroStat.DEF]: 1,
      [HeroStat.STA]: 1,
      [HeroStat.GOLD]: 1
    },
    statGrowth: {
      [HeroStat.LVL]: () => 1,
      [HeroStat.EXP]: () => 150,
      [HeroStat.HP]: () => 5,
      [HeroStat.SP]: () => 3,
      [HeroStat.ATK]: () => 5,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 6,
      [HeroStat.GOLD]: () => 0
    },
    triggers: {},
    combatTriggers: {
      [TriggerType.PreCombat]: [JobActions.AttackAllPercent(5)]
    },
    actions: [JobActions.Attack(), JobActions.AttackAllDiminishing()]
  },

  [HeroJob.Thief]: {
    description: 'Sneaky robber. Post-combat gold.',
    chooseName: () => species.human({ allowMultipleNames: true }),
    sprites: ['thief1', 'thief2', 'thief3', 'thief4'],
    statBaseMultiplier: {
      [HeroStat.LVL]: 1,
      [HeroStat.EXP]: 1,
      [HeroStat.HP]: 1,
      [HeroStat.SP]: 1,
      [HeroStat.ATK]: 1,
      [HeroStat.DEF]: 1,
      [HeroStat.STA]: 1,
      [HeroStat.GOLD]: 2
    },
    statGrowth: {
      [HeroStat.LVL]: () => 1,
      [HeroStat.EXP]: () => 110,
      [HeroStat.HP]: () => 7,
      [HeroStat.SP]: () => 5,
      [HeroStat.ATK]: () => 4,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 3,
      [HeroStat.GOLD]: () => 100
    },
    triggers: {},
    combatTriggers: {
      [TriggerType.Victory]: [JobActions.EarnGold(50)]
    },
    actions: [JobActions.Attack()]
  },

  [HeroJob.Warrior]: {
    description: 'Powerful damager. Pre-combat nukes.',
    chooseName: () => species.human({ allowMultipleNames: true }),
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
      [HeroStat.ATK]: () => 5,
      [HeroStat.DEF]: () => 3,
      [HeroStat.STA]: () => 2,
      [HeroStat.GOLD]: () => 15
    },
    triggers: {},
    combatTriggers: {
      [TriggerType.PreCombat]: [JobActions.AttackSinglePercent(15)]
    },
    actions: [JobActions.Attack(), JobActions.AttackSinglePercent(5)]
  }
};
