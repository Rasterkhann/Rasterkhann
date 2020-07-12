
import { species } from 'fantastical';
import { random } from 'lodash';

import { HeroJobStatic, HeroJob, HeroStat, TriggerType, WeaponSubType } from '../interfaces';

import * as JobActions from './actions';

export const JobEffects: Record<HeroJob, HeroJobStatic> = {
  [HeroJob.Adventurer]: {
    description: 'Standard adventuring class. Balanced stats.',
    chooseName: () => species.human({ allowMultipleNames: true }),
    sprites: [
      'adventurer_f1', 'adventurer_f2', 'adventurer_f3', 'adventurer_f4',
      'adventurer_m1', 'adventurer_m2', 'adventurer_m3', 'adventurer_m4'
    ],
    costMultiplier: 1,
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
      [HeroStat.EXP]: () => random(300, 500),
      [HeroStat.HP]: () => 12,
      [HeroStat.SP]: () => 4,
      [HeroStat.ATK]: () => 2,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 4,
      [HeroStat.GOLD]: () => 50
    },
    triggers: {},
    combatTriggers: {},
    actions: [JobActions.Attack()],
    validWeaponTypes: [WeaponSubType.Hatchet, WeaponSubType.Sword, WeaponSubType.Knife, WeaponSubType.Longbow, WeaponSubType.Shortbow]
  },

  [HeroJob.Cleric]: {
    description: 'Combat healer. Post-combat revives.',
    chooseName: () => species.human({ allowMultipleNames: true }),
    sprites: ['cleric1', 'cleric2', 'cleric3', 'cleric4'],
    costMultiplier: 4,
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
      [HeroStat.EXP]: () => random(350, 650),
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
    actions: [JobActions.Attack(), JobActions.Heal()],
    validWeaponTypes: [WeaponSubType.Mace, WeaponSubType.Staff]
  },

  [HeroJob.Mage]: {
    description: 'AoE specialist. Pre-combat spread.',
    chooseName: () => species.human({ allowMultipleNames: true }),
    sprites: ['mage1', 'mage2', 'mage3', 'mage4'],
    costMultiplier: 5,
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
      [HeroStat.EXP]: () => random(400, 750),
      [HeroStat.HP]: () => 5,
      [HeroStat.SP]: () => 3,
      [HeroStat.ATK]: () => 3,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 6,
      [HeroStat.GOLD]: () => 0
    },
    triggers: {},
    combatTriggers: {
      [TriggerType.PreCombat]: [JobActions.AttackAllPercent(15)]
    },
    actions: [JobActions.Attack(), JobActions.AttackAllDiminishing()],
    validWeaponTypes: [WeaponSubType.Wand, WeaponSubType.Staff]
  },

  [HeroJob.Thief]: {
    description: 'Sneaky robber. Post-combat gold.',
    chooseName: () => species.human({ allowMultipleNames: true }),
    sprites: ['thief1', 'thief2', 'thief3', 'thief4'],
    costMultiplier: 3.5,
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
      [HeroStat.EXP]: () => random(200, 350),
      [HeroStat.HP]: () => 7,
      [HeroStat.SP]: () => 5,
      [HeroStat.ATK]: () => 3,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 3,
      [HeroStat.GOLD]: () => 100
    },
    triggers: {},
    combatTriggers: {
      [TriggerType.Victory]: [JobActions.EarnGold(50)]
    },
    actions: [JobActions.Attack()],
    validWeaponTypes: [WeaponSubType.Knife, WeaponSubType.Katar, WeaponSubType.Shuriken]
  },

  [HeroJob.Warrior]: {
    description: 'Powerful damager. Pre-combat nukes.',
    chooseName: () => species.human({ allowMultipleNames: true }),
    sprites: ['warrior1', 'warrior2', 'warrior3', 'warrior4'],
    costMultiplier: 10,
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
      [HeroStat.EXP]: () => random(500, 900),
      [HeroStat.HP]: () => 15,
      [HeroStat.SP]: () => 1,
      [HeroStat.ATK]: () => 4,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 2,
      [HeroStat.GOLD]: () => 15
    },
    triggers: {},
    combatTriggers: {
      [TriggerType.PreCombat]: [JobActions.AttackSinglePercent(30)]
    },
    actions: [JobActions.Attack(), JobActions.AttackSinglePercent(5)],
    validWeaponTypes: [WeaponSubType.Sword, WeaponSubType.Hatchet, WeaponSubType.Spear, WeaponSubType.Mace]
  }
};
