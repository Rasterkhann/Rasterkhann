
import { species } from 'fantastical';
import { random } from 'lodash';

import { HeroJobStatic, HeroJob, HeroStat, TriggerType, WeaponSubType, Hero, ArmorWeight } from '../interfaces';
import { getCurrentStat } from '../helpers/global';

import * as JobActions from './actions';
import * as JobActionMessages from './action-messages';

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
      [HeroStat.EXP]: (level) => level * random(20, 30),
      [HeroStat.HP]: () => 12,
      [HeroStat.SP]: () => 4,
      [HeroStat.ATK]: () => 2,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 4,
      [HeroStat.GOLD]: () => 50
    },
    triggers: {},
    combatTriggers: {},
    actions: (hero: Hero) => {
      const base = [JobActions.Attack(JobActionMessages.AttackMessage)];

      return base;
    },
    validWeaponTypes: [WeaponSubType.Hatchet, WeaponSubType.Sword, WeaponSubType.Knife, WeaponSubType.Longbow, WeaponSubType.Shortbow],
    validArmorClasses: [ArmorWeight.Light, ArmorWeight.Medium],
    crystalStats: [HeroStat.HP]
  },

  [HeroJob.Cleric]: {
    description: 'Combat healer. Post-combat heals.',
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
      [HeroStat.EXP]: (level) => level * random(30, 35),
      [HeroStat.HP]: () => 10,
      [HeroStat.SP]: () => 3,
      [HeroStat.ATK]: () => 2,
      [HeroStat.DEF]: () => 3,
      [HeroStat.STA]: () => 5,
      [HeroStat.GOLD]: () => 0
    },
    triggers: {},
    combatTriggers: {
      [TriggerType.PostCombat]: [JobActions.HealSomeOrAllPercent(JobActionMessages.HealMessage, { pct: 10 })]
    },
    actions: (hero: Hero) => {
      const base = [
        JobActions.Attack(JobActionMessages.AttackMessage),
        JobActions.Heal(JobActionMessages.HealMessage)
      ];

      return base;
    },
    validWeaponTypes: [WeaponSubType.Mace, WeaponSubType.Staff],
    validArmorClasses: [ArmorWeight.Medium, ArmorWeight.Heavy],
    crystalStats: [HeroStat.DEF]
  },

  [HeroJob.Mage]: {
    description: 'AoE specialist. Pre-combat AoE burst.',
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
      [HeroStat.EXP]: (level) => level * random(35, 40),
      [HeroStat.HP]: () => 5,
      [HeroStat.SP]: () => 3,
      [HeroStat.ATK]: () => 3,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 6,
      [HeroStat.GOLD]: () => 0
    },
    triggers: {},
    combatTriggers: {
      [TriggerType.PreCombat]: [JobActions.AttackSomeOrAllPercent(JobActionMessages.FireballMessage, { pct: 15 })]
    },
    actions: (hero: Hero) => {
      const base = [
        JobActions.Attack(JobActionMessages.AttackMessage),
        JobActions.AttackSomeOrAllDiminishing(JobActionMessages.MagicMissileMessage, { targets: 2 })
      ];

      return base;
    },
    validWeaponTypes: [WeaponSubType.Wand, WeaponSubType.Staff],
    validArmorClasses: [ArmorWeight.Light],
    crystalStats: [HeroStat.SP]
  },

  [HeroJob.Thief]: {
    description: 'Sneaky robber. Post-combat gold gain.',
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
      [HeroStat.EXP]: (level) => level * random(15, 20),
      [HeroStat.HP]: () => 7,
      [HeroStat.SP]: () => 5,
      [HeroStat.ATK]: () => 3,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 3,
      [HeroStat.GOLD]: () => 100
    },
    triggers: {},
    combatTriggers: {
      [TriggerType.Victory]: [JobActions.EarnGold(JobActionMessages.FindGoldMessage, { gold: 50 })]
    },
    actions: (hero: Hero) => {
      const base = [JobActions.Attack(JobActionMessages.AttackMessage)];

      return base;
    },
    validWeaponTypes: [WeaponSubType.Knife, WeaponSubType.Katar, WeaponSubType.Shuriken],
    validArmorClasses: [ArmorWeight.Light, ArmorWeight.Medium],
    crystalStats: [HeroStat.STA]
  },

  [HeroJob.Warrior]: {
    description: 'Powerful ST damager. Pre-combat ST nuke.',
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
      [HeroStat.EXP]: (level) => level * random(30, 40),
      [HeroStat.HP]: () => 15,
      [HeroStat.SP]: () => 1,
      [HeroStat.ATK]: () => 4,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 2,
      [HeroStat.GOLD]: () => 15
    },
    triggers: {},
    combatTriggers: {
      [TriggerType.PreCombat]: [JobActions.AttackSinglePercent(JobActionMessages.CleaveMessage, { pct: 30 })]
    },
    actions: (hero: Hero) => {
      const base = [
        JobActions.Attack(JobActionMessages.AttackMessage),
        JobActions.AttackSinglePercent(JobActionMessages.HamstringMessage, { pct: 5 })
      ];

      return base;
    },
    validWeaponTypes: [WeaponSubType.Sword, WeaponSubType.Hatchet, WeaponSubType.Spear, WeaponSubType.Mace],
    validArmorClasses: [ArmorWeight.Heavy],
    crystalStats: [HeroStat.ATK]
  }
};
