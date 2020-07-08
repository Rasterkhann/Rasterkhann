
import { sample, random } from 'lodash';

import { Hero, HeroJobAction, HeroJobActionTargetting, HeroStat } from '../interfaces';

function getCurrentStat(hero: Hero, stat: HeroStat): number {
  return hero.currentStats[stat];
}

function heal(creature: Hero, healed: number): void {
  console.log(JSON.stringify(creature), 'PRE');
  creature.currentStats[HeroStat.HP] = Math.min(creature.stats[HeroStat.HP], creature.currentStats[HeroStat.HP] + healed);
  console.log(JSON.stringify(creature), 'POST');
}

function takeDamage(creature: Hero, damage: number): void {
  creature.currentStats[HeroStat.HP] = Math.max(0, creature.currentStats[HeroStat.HP] - damage);
}

function calculateDamage(atk: number, def: number): number {
  return Math.floor(Math.max(1, random(-def, atk)));
}

// ***** ATTACK ABILITIES ***** //
export const Attack: () => HeroJobAction = () => ({
  staCost: () => 1,
  spCost: () => 0,
  targets: (targetting: HeroJobActionTargetting) => {
    return [sample(targetting.livingEnemies)] as Hero[];
  },
  act: (hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = calculateDamage(getCurrentStat(hero, HeroStat.ATK), getCurrentStat(target, HeroStat.DEF));
      takeDamage(target, damage);
    });
  }
});

export const AttackAll: () => HeroJobAction = () => ({
  staCost: () => 1,
  spCost: () => 3,
  targets: (targetting: HeroJobActionTargetting) => {
    return targetting.livingEnemies;
  },
  act: (hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = calculateDamage(getCurrentStat(hero, HeroStat.ATK), getCurrentStat(target, HeroStat.DEF));
      takeDamage(target, damage);
    });
  }
});

export const AttackAllDiminishing: () => HeroJobAction = () => ({
  staCost: () => 1,
  spCost: () => 3,
  targets: (targetting: HeroJobActionTargetting) => {
    return targetting.livingEnemies;
  },
  act: (hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = calculateDamage(getCurrentStat(hero, HeroStat.ATK) / targets.length, getCurrentStat(target, HeroStat.DEF));
      takeDamage(target, damage);
    });
  }
});

export const AttackSinglePercent: (pct: number) => HeroJobAction = (pct: number) => ({
  staCost: () => 2,
  spCost: () => 5,
  targets: (targetting: HeroJobActionTargetting) => {
    return [sample(targetting.livingEnemies)] as Hero[];
  },
  act: (hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      takeDamage(target, damage);
    });
  }
});

export const AttackAllPercent: (pct: number) => HeroJobAction = (pct: number) => ({
  staCost: () => 2,
  spCost: () => 5,
  targets: (targetting: HeroJobActionTargetting) => {
    return targetting.livingEnemies;
  },
  act: (hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      takeDamage(target, damage);
    });
  }
});

// ***** HEALING ABILITIES ***** //
export const Heal: () => HeroJobAction = () => ({
  staCost: () => 3,
  spCost: () => 10,
  targets: (targetting: HeroJobActionTargetting) => {
    return [sample(targetting.livingAllies)] as Hero[];
  },
  act: (hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      heal(target, getCurrentStat(hero, HeroStat.DEF));
    });
  }
});

export const HealAllPercent: (pct: number) => HeroJobAction = (pct: number) => ({
  staCost: () => 5,
  spCost: () => 7,
  targets: (targetting: HeroJobActionTargetting) => {
    return targetting.livingAllies;
  },
  act: (hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const healed = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      heal(target, healed);
    });
  }
});

// ***** GOLD ABILITIES ***** //
export const EarnGold: (gold: number) => HeroJobAction = (gold: number) => ({
  staCost: () => 0,
  spCost: () => 3,
  targets: (targetting: HeroJobActionTargetting) => {
    return [targetting.self];
  },
  act: (hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      target.currentStats[HeroStat.GOLD] += gold || 0;
    });
  }
});
