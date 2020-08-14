import { SkillBookPreset, HeroJob } from '../interfaces';

const BaseValue = (val: number) => val;
const MultiplyBy = (mult: number) => (val: number) => Math.floor(val * mult);

export const SKILL_BOOK_PRESETS: SkillBookPreset[] = [
  {
    name: 'Attack',
    changeableStats: ['defMultiplier', 'atkMultiplier', 'times'],
    sprite: 63,
    action: 'Attack',
    message: 'AttackMessage',
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 0,
      gold: 0,
      targets: 1
    },
    statMults: {
      staCost: BaseValue,
      spCost: BaseValue,
      defMultiplier: BaseValue,
      atkMultiplier: BaseValue,
      times: BaseValue,
      pct: BaseValue,
      gold: BaseValue,
      targets: BaseValue
    }
  },
  {
    name: 'Heal',
    changeableStats: ['defMultiplier', 'times', 'targets'],
    sprite: 37,
    jobs: [HeroJob.Cleric],
    action: 'HealSomeOrAll',
    message: 'HealMessage',
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 0,
      gold: 0,
      targets: 1
    },
    statMults: {
      staCost: MultiplyBy(0.8),
      spCost: MultiplyBy(1.5),
      defMultiplier: BaseValue,
      atkMultiplier: BaseValue,
      times: BaseValue,
      pct: BaseValue,
      gold: BaseValue,
      targets: BaseValue
    }
  },
  {
    name: 'Restore',
    changeableStats: ['defMultiplier', 'times', 'targets'],
    sprite: 118,
    jobs: [HeroJob.Cleric],
    action: 'HealSomeOrAllPercent',
    message: 'HealMessage',
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 0,
      gold: 0,
      targets: 1
    },
    statMults: {
      staCost: BaseValue,
      spCost: MultiplyBy(2),
      defMultiplier: BaseValue,
      atkMultiplier: BaseValue,
      times: BaseValue,
      pct: BaseValue,
      gold: BaseValue,
      targets: BaseValue
    }
  },
  {
    name: 'Fireball',
    changeableStats: ['pct', 'times', 'targets'],
    sprite: 0,
    jobs: [HeroJob.Mage],
    action: 'AttackSomeOrAll',
    message: 'FireballMessage',
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 5,
      gold: 0,
      targets: 1
    },
    statMults: {
      staCost: MultiplyBy(0.7),
      spCost: MultiplyBy(2),
      defMultiplier: BaseValue,
      atkMultiplier: BaseValue,
      times: BaseValue,
      pct: BaseValue,
      gold: BaseValue,
      targets: BaseValue
    }
  },
  {
    name: 'Magic Missile',
    changeableStats: ['atkMultiplier', 'defMultiplier', 'times', 'targets'],
    sprite: 32,
    jobs: [HeroJob.Mage],
    action: 'AttackSomeOrAllDiminishing',
    message: 'MagicMissileMessage',
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 0,
      gold: 0,
      targets: 1
    },
    statMults: {
      staCost: MultiplyBy(1.1),
      spCost: MultiplyBy(1.6),
      defMultiplier: BaseValue,
      atkMultiplier: BaseValue,
      times: BaseValue,
      pct: BaseValue,
      gold: BaseValue,
      targets: BaseValue
    }
  },
  {
    name: 'Acid Spray',
    changeableStats: ['pct', 'times', 'targets'],
    sprite: 24,
    jobs: [HeroJob.Mage],
    action: 'AttackSomeOrAllPercent',
    message: 'MagicMissileMessage',
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 3,
      gold: 0,
      targets: 1
    },
    statMults: {
      staCost: MultiplyBy(1.7),
      spCost: MultiplyBy(2.5),
      defMultiplier: BaseValue,
      atkMultiplier: BaseValue,
      times: BaseValue,
      pct: BaseValue,
      gold: BaseValue,
      targets: BaseValue
    }
  },
  {
    name: 'Mug',
    changeableStats: ['gold', 'targets', 'times', 'atkMultiplier', 'defMultiplier'],
    sprite: 153,
    jobs: [HeroJob.Thief],
    action: 'Mug',
    message: 'MugMessage',
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 0,
      gold: 100,
      targets: 1
    },
    statMults: {
      staCost: MultiplyBy(2),
      spCost: MultiplyBy(1.5),
      defMultiplier: BaseValue,
      atkMultiplier: BaseValue,
      times: BaseValue,
      pct: BaseValue,
      gold: BaseValue,
      targets: BaseValue
    }
  },
  {
    name: 'Hamstring',
    changeableStats: ['pct', 'times'],
    sprite: 61,
    jobs: [HeroJob.Warrior],
    action: 'AttackSinglePercent',
    message: 'HamstringMessage',
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 5,
      gold: 0,
      targets: 1
    },
    statMults: {
      staCost: MultiplyBy(1.5),
      spCost: MultiplyBy(1.3),
      defMultiplier: BaseValue,
      atkMultiplier: BaseValue,
      times: BaseValue,
      pct: BaseValue,
      gold: BaseValue,
      targets: BaseValue
    }
  },
];
