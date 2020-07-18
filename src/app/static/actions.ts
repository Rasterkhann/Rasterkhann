
import { sample, random } from 'lodash';

import { Combat, Hero, HeroAction, HeroActionTargetting, HeroStat, HeroActionStringReplacer } from '../interfaces';
import { getCurrentStat, giveHeroGold } from '../helpers/global';

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
export const Attack: (replacer: HeroActionStringReplacer) => HeroAction
                   = (replacer: HeroActionStringReplacer) => ({
  staCost: () => 1,
  spCost: () => 0,
  targets: (targetting: HeroActionTargetting) => {
    return [sample(targetting.livingEnemies)] as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = calculateDamage(getCurrentStat(hero, HeroStat.ATK), getCurrentStat(target, HeroStat.DEF));
      takeDamage(target, damage);

      const message = replacer.replace({ source: hero, target, value: damage });
      combat.addLogEntry(message);
    });
  }
});

export const AttackAll: (replacer: HeroActionStringReplacer) => HeroAction
                      = (replacer: HeroActionStringReplacer) => ({
  staCost: () => 3,
  spCost: () => 3,
  targets: (targetting: HeroActionTargetting) => {
    return targetting.livingEnemies;
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = calculateDamage(getCurrentStat(hero, HeroStat.ATK), getCurrentStat(target, HeroStat.DEF));
      takeDamage(target, damage);

      const message = replacer.replace({ source: hero, target, value: damage });
      combat.addLogEntry(message);
    });
  }
});

export const AttackAllDiminishing: (replacer: HeroActionStringReplacer) => HeroAction
                                 = (replacer: HeroActionStringReplacer) => ({
  staCost: () => 5,
  spCost: () => 3,
  targets: (targetting: HeroActionTargetting) => {
    return targetting.livingEnemies;
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = calculateDamage(getCurrentStat(hero, HeroStat.ATK) / targets.length, getCurrentStat(target, HeroStat.DEF));
      takeDamage(target, damage);

      const message = replacer.replace({ source: hero, target, value: damage });
      combat.addLogEntry(message);
    });
  }
});

export const AttackSinglePercent: (replacer: HeroActionStringReplacer, pct: number) => HeroAction
                                = (replacer: HeroActionStringReplacer, pct: number) => ({
  staCost: () => 4,
  spCost: () => 5,
  targets: (targetting: HeroActionTargetting) => {
    return [sample(targetting.livingEnemies)] as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      takeDamage(target, damage);

      const message = replacer.replace({ source: hero, target, value: damage });
      combat.addLogEntry(message);
    });
  }
});

export const AttackAllPercent: (replacer: HeroActionStringReplacer, pct: number) => HeroAction
                             = (replacer: HeroActionStringReplacer, pct: number) => ({
  staCost: () => 7,
  spCost: () => 5,
  targets: (targetting: HeroActionTargetting) => {
    return targetting.livingEnemies;
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const damage = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      takeDamage(target, damage);

      const message = replacer.replace({ source: hero, target, value: damage });
      combat.addLogEntry(message);
    });
  }
});

// ***** HEALING ABILITIES ***** //
export const Heal: (replacer: HeroActionStringReplacer) => HeroAction
                 = (replacer: HeroActionStringReplacer) => ({
  staCost: () => 5,
  spCost: () => 10,
  targets: (targetting: HeroActionTargetting) => {
    return [sample(targetting.livingAllies)] as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const healed = getCurrentStat(hero, HeroStat.DEF);
      heal(target, healed);

      const message = replacer.replace({ source: hero, target, value: healed });
      combat.addLogEntry(message);
    });
  }
});

export const HealPercent: (replacer: HeroActionStringReplacer, pct: number) => HeroAction
                        = (replacer: HeroActionStringReplacer, pct: number) => ({
  staCost: () => 7,
  spCost: () => 10,
  targets: (targetting: HeroActionTargetting) => {
    return [sample(targetting.livingAllies)] as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const healed = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      heal(target, healed);

      const message = replacer.replace({ source: hero, target, value: healed });
      combat.addLogEntry(message);
    });
  }
});

export const HealAllPercent: (replacer: HeroActionStringReplacer, pct: number) => HeroAction
                           = (replacer: HeroActionStringReplacer, pct: number) => ({
  staCost: () => 10,
  spCost: () => 7,
  targets: (targetting: HeroActionTargetting) => {
    return targetting.livingAllies;
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const healed = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      heal(target, healed);

      const message = replacer.replace({ source: hero, target, value: healed });
      combat.addLogEntry(message);
    });
  }
});

// ***** GOLD ABILITIES ***** //
export const EarnGold: (replacer: HeroActionStringReplacer, gold: number) => HeroAction
                     = (replacer: HeroActionStringReplacer, gold: number = 0) => ({
  staCost: () => 5,
  spCost: () => 3,
  targets: (targetting: HeroActionTargetting) => {
    return [targetting.self];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    targets.forEach(target => {
      const earnedGold = target.currentStats[HeroStat.LVL] * gold;
      giveHeroGold(target, earnedGold);

      const message = replacer.replace({ source: hero, target, value: earnedGold });
      combat.addLogEntry(message);
    });
  }
});
