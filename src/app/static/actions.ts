
import { sample, random } from 'lodash';

import { Combat, Hero, HeroAction, HeroActionTargetting, HeroStat } from '../interfaces';

function getCurrentStat(hero: Hero, stat: HeroStat): number {
  return hero.currentStats[stat];
}

function heal(creature: Hero, healed: number): void {
  creature.currentStats[HeroStat.HP] = Math.min(creature.stats[HeroStat.HP], creature.currentStats[HeroStat.HP] + healed);
}

function takeDamage(creature: Hero, damage: number): void {
  creature.currentStats[HeroStat.HP] = Math.max(0, creature.currentStats[HeroStat.HP] - damage);
}

function calculateDamage(atk: number, def: number): number {
  return Math.floor(Math.max(1, random(-def, atk)));
}

// ***** ATTACK ABILITIES ***** //
export const Attack: () => HeroAction = () => ({
  staCost: () => 1,
  spCost: () => 0,
  targets: (targetting: HeroActionTargetting) => {
    return [sample(targetting.livingEnemies)] as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = calculateDamage(getCurrentStat(hero, HeroStat.ATK), getCurrentStat(target, HeroStat.DEF));
      takeDamage(target, damage);

      combat.addLogEntry(`${combat.getHeroTag(hero)} attacked ${target.name} for ${damage} HP!`);
    });
  }
});

export const AttackAll: () => HeroAction = () => ({
  staCost: () => 3,
  spCost: () => 3,
  targets: (targetting: HeroActionTargetting) => {
    return targetting.livingEnemies;
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = calculateDamage(getCurrentStat(hero, HeroStat.ATK), getCurrentStat(target, HeroStat.DEF));
      takeDamage(target, damage);

      combat.addLogEntry(`${combat.getHeroTag(hero)} attacked ${target.name} for ${damage} HP!`);
    });
  }
});

export const AttackAllDiminishing: () => HeroAction = () => ({
  staCost: () => 5,
  spCost: () => 3,
  targets: (targetting: HeroActionTargetting) => {
    return targetting.livingEnemies;
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = calculateDamage(getCurrentStat(hero, HeroStat.ATK) / targets.length, getCurrentStat(target, HeroStat.DEF));
      takeDamage(target, damage);

      combat.addLogEntry(`${combat.getHeroTag(hero)} attacked ${target.name} for ${damage} HP!`);
    });
  }
});

export const AttackSinglePercent: (pct: number) => HeroAction = (pct: number) => ({
  staCost: () => 4,
  spCost: () => 5,
  targets: (targetting: HeroActionTargetting) => {
    return [sample(targetting.livingEnemies)] as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      takeDamage(target, damage);

      combat.addLogEntry(`${combat.getHeroTag(hero)} attacked ${target.name} for ${damage} HP!`);
    });
  }
});

export const AttackAllPercent: (pct: number) => HeroAction = (pct: number) => ({
  staCost: () => 7,
  spCost: () => 5,
  targets: (targetting: HeroActionTargetting) => {
    return targetting.livingEnemies;
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      takeDamage(target, damage);

      combat.addLogEntry(`${combat.getHeroTag(hero)} attacked ${target.name} for ${damage} HP!`);
    });
  }
});

// ***** HEALING ABILITIES ***** //
export const Heal: () => HeroAction = () => ({
  staCost: () => 5,
  spCost: () => 10,
  targets: (targetting: HeroActionTargetting) => {
    return [sample(targetting.livingAllies)] as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const healed = getCurrentStat(hero, HeroStat.DEF);
      heal(target, healed);

      combat.addLogEntry(`${combat.getHeroTag(hero)} healed ${target.name} for ${healed} HP!`);
    });
  }
});

export const HealPercent: (pct: number) => HeroAction = (pct: number) => ({
  staCost: () => 7,
  spCost: () => 10,
  targets: (targetting: HeroActionTargetting) => {
    return [sample(targetting.livingAllies)] as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const healed = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      heal(target, healed);

      combat.addLogEntry(`${combat.getHeroTag(hero)} healed ${target.name} for ${healed} HP!`);
    });
  }
});

export const HealAllPercent: (pct: number) => HeroAction = (pct: number) => ({
  staCost: () => 10,
  spCost: () => 7,
  targets: (targetting: HeroActionTargetting) => {
    return targetting.livingAllies;
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const healed = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      heal(target, healed);

      combat.addLogEntry(`${combat.getHeroTag(hero)} healed ${target.name} for ${healed} HP!`);
    });
  }
});

// ***** GOLD ABILITIES ***** //
export const EarnGold: (gold: number) => HeroAction = (gold: number = 0) => ({
  staCost: () => 5,
  spCost: () => 3,
  targets: (targetting: HeroActionTargetting) => {
    return [targetting.self];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      target.currentStats[HeroStat.GOLD] += gold;

      combat.addLogEntry(`${combat.getHeroTag(hero)} found ${gold} GOLD!`);
    });
  }
});
