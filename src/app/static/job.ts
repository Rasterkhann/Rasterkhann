import { HeroJobStatic, HeroJob, HeroStat } from '../interfaces';

export const JobEffects: Record<HeroJob, HeroJobStatic> = {
  [HeroJob.Adventurer]: {
    description: 'Standard adventuring class. Balanced stats.',
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
      [HeroStat.EXP]: () => 1,
      [HeroStat.HP]: () => 10,
      [HeroStat.SP]: () => 5,
      [HeroStat.ATK]: () => 1,
      [HeroStat.DEF]: () => 1,
      [HeroStat.STA]: () => 5,
      [HeroStat.GOLD]: () => 0
    },
    triggers: {}
  },

  [HeroJob.Cleric]: {
    description: 'Combat healer. Post-combat revives.',
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
      [HeroStat.EXP]: () => 1,
      [HeroStat.HP]: () => 5,
      [HeroStat.SP]: () => 3,
      [HeroStat.ATK]: () => 1,
      [HeroStat.DEF]: () => 2,
      [HeroStat.STA]: () => 5,
      [HeroStat.GOLD]: () => 0
    },
    triggers: {}
  },

  [HeroJob.Mage]: {
    description: 'AoE specialist. Pre-combat spread.',
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
      [HeroStat.EXP]: () => 1,
      [HeroStat.HP]: () => 5,
      [HeroStat.SP]: () => 1,
      [HeroStat.ATK]: () => 3,
      [HeroStat.DEF]: () => 1,
      [HeroStat.STA]: () => 4,
      [HeroStat.GOLD]: () => 0
    },
    triggers: {}
  },

  [HeroJob.Thief]: {
    description: 'Sneaky robber. Post-combat gold.',
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
      [HeroStat.EXP]: () => 1,
      [HeroStat.HP]: () => 15,
      [HeroStat.SP]: () => 1,
      [HeroStat.ATK]: () => 2,
      [HeroStat.DEF]: () => 1,
      [HeroStat.STA]: () => 2,
      [HeroStat.GOLD]: () => 0
    },
    triggers: {}
  }
};
