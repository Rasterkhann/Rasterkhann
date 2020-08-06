import { SkillBookPreset, HeroJob } from '../interfaces';

export const SKILL_BOOK_PRESETS: SkillBookPreset[] = [
  {
    name: 'Attack',
    changeableStats: ['defMultiplier', 'atkMultiplier', 'times'],
    sprite: 63,
    action: 'Attack',
    message: 'AttackMessage',
    staMult: 1,
    spMult: 1,
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 0,
      gold: 0,
      targets: 1
    }
  },
  {
    name: 'Heal',
    changeableStats: ['defMultiplier', 'times', 'targets'],
    sprite: 37,
    jobs: [HeroJob.Cleric],
    action: 'HealSomeOrAll',
    message: 'HealMessage',
    staMult: 0.8,
    spMult: 1.5,
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 0,
      gold: 0,
      targets: 1
    }
  },
  {
    name: 'Restore',
    changeableStats: ['defMultiplier', 'times', 'targets'],
    sprite: 118,
    jobs: [HeroJob.Cleric],
    action: 'HealSomeOrAllPercent',
    message: 'HealMessage',
    staMult: 1,
    spMult: 2,
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 0,
      gold: 0,
      targets: 1
    }
  },
  {
    name: 'Fireball',
    changeableStats: ['pct', 'times', 'targets'],
    sprite: 0,
    jobs: [HeroJob.Mage],
    action: 'AttackSomeOrAll',
    message: 'FireballMessage',
    staMult: 0.7,
    spMult: 2,
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 5,
      gold: 0,
      targets: 1
    }
  },
  {
    name: 'Magic Missile',
    changeableStats: ['atkMultiplier', 'defMultiplier', 'times', 'targets'],
    sprite: 32,
    jobs: [HeroJob.Mage],
    action: 'AttackSomeOrAllDiminishing',
    message: 'MagicMissileMessage',
    staMult: 1.1,
    spMult: 1.6,
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 0,
      gold: 0,
      targets: 1
    }
  },
  {
    name: 'Acid Spray',
    changeableStats: ['pct', 'times', 'targets'],
    sprite: 24,
    jobs: [HeroJob.Mage],
    action: 'AttackSomeOrAllPercent',
    message: 'MagicMissileMessage',
    staMult: 1.7,
    spMult: 2.5,
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 3,
      gold: 0,
      targets: 1
    }
  },
  {
    name: 'Mug',
    changeableStats: ['gold', 'targets', 'times', 'atkMultiplier', 'defMultiplier'],
    sprite: 153,
    jobs: [HeroJob.Thief],
    action: 'Mug',
    message: 'MugMessage',
    staMult: 2,
    spMult: 1.5,
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 0,
      gold: 100,
      targets: 1
    }
  },
  {
    name: 'Hamstring',
    changeableStats: ['pct', 'times'],
    sprite: 61,
    jobs: [HeroJob.Warrior],
    action: 'AttackSinglePercent',
    message: 'HamstringMessage',
    staMult: 1.5,
    spMult: 1.3,
    baseStats: {
      staCost: 3,
      spCost: 3,
      defMultiplier: 0,
      atkMultiplier: 0,
      times: 1,
      pct: 5,
      gold: 0,
      targets: 1
    }
  },
];
