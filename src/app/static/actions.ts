
import { sample, sampleSize, random } from 'lodash';

import { Combat, Hero, HeroAction, HeroActionTargetting, HeroStat, HeroActionStringReplacer, HeroActionOpts } from '../interfaces';
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
export const Attack: (replacer: HeroActionStringReplacer, opts?: HeroActionOpts) => HeroAction
                   = (replacer: HeroActionStringReplacer, opts: HeroActionOpts = {}) => ({
  staCost: () => opts.staCost || 1,
  spCost: () => opts.spCost || 0,
  targets: (targetting: HeroActionTargetting) => {
    const numTargets = opts.targets || 1;
    return sampleSize(targetting.livingEnemies, numTargets) as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    const defMultiplier = opts.defMultiplier || 1;
    const atkMultiplier = opts.atkMultiplier || 1;

    targets.forEach(target => {
      const damage = calculateDamage(
        getCurrentStat(hero, HeroStat.ATK) * atkMultiplier,
        getCurrentStat(target, HeroStat.DEF) * defMultiplier
      );

      takeDamage(target, damage);

      const message = replacer.replace({ source: hero, target, value: damage });
      combat.addLogEntry(message);
    });
  }
});

export const AttackSomeOrAll: (replacer: HeroActionStringReplacer, opts?: HeroActionOpts) => HeroAction
                            = (replacer: HeroActionStringReplacer, opts: HeroActionOpts = {}) => ({
  staCost: () => opts.staCost || 3,
  spCost: () => opts.spCost || 3,
  targets: (targetting: HeroActionTargetting) => {
    const numTargets = opts.targets || targetting.livingEnemies.length;
    return sampleSize(targetting.livingEnemies, numTargets) as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    const defMultiplier = opts.defMultiplier || 1;
    const atkMultiplier = opts.atkMultiplier || 1;

    targets.forEach(target => {
      const damage = calculateDamage(
        getCurrentStat(hero, HeroStat.ATK) * atkMultiplier,
        getCurrentStat(target, HeroStat.DEF) * defMultiplier
      );

      takeDamage(target, damage);

      const message = replacer.replace({ source: hero, target, value: damage });
      combat.addLogEntry(message);
    });
  }
});

export const AttackSomeOrAllDiminishing: (replacer: HeroActionStringReplacer, opts?: HeroActionOpts) => HeroAction
                                       = (replacer: HeroActionStringReplacer, opts: HeroActionOpts = {}) => ({
  staCost: () => opts.staCost || 5,
  spCost: () => opts.spCost || 3,
  targets: (targetting: HeroActionTargetting) => {
    const numTargets = opts.targets || targetting.livingEnemies.length;
    return sampleSize(targetting.livingEnemies, numTargets) as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    const defMultiplier = opts.defMultiplier || 1;
    const atkMultiplier = opts.atkMultiplier || 1;

    targets.forEach(target => {
      const damage = calculateDamage(
        (getCurrentStat(hero, HeroStat.ATK) / targets.length) * atkMultiplier,
        getCurrentStat(target, HeroStat.DEF) * defMultiplier
      );

      takeDamage(target, damage);

      const message = replacer.replace({ source: hero, target, value: damage });
      combat.addLogEntry(message);
    });
  }
});

export const AttackSinglePercent: (replacer: HeroActionStringReplacer, opts?: HeroActionOpts) => HeroAction
                                = (replacer: HeroActionStringReplacer, opts: HeroActionOpts = {}) => ({
  staCost: () => opts.staCost || 4,
  spCost: () => opts.spCost || 5,
  targets: (targetting: HeroActionTargetting) => {
    return [sample(targetting.livingEnemies)] as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    const pct = opts.pct || 1;

    targets.forEach(target => {
      const damage = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      takeDamage(target, damage);

      const message = replacer.replace({ source: hero, target, value: damage });
      combat.addLogEntry(message);
    });
  }
});

export const AttackSomeOrAllPercent: (replacer: HeroActionStringReplacer, opts?: HeroActionOpts) => HeroAction
                                   = (replacer: HeroActionStringReplacer, opts: HeroActionOpts = {}) => ({
  staCost: () => opts.staCost || 7,
  spCost: () => opts.spCost || 5,
  targets: (targetting: HeroActionTargetting) => {
    const numTargets = opts.targets || targetting.livingEnemies.length;
    return sampleSize(targetting.livingEnemies, numTargets) as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    const pct = opts.pct || 1;

    targets.forEach(target => {
      const damage = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      takeDamage(target, damage);

      const message = replacer.replace({ source: hero, target, value: damage });
      combat.addLogEntry(message);
    });
  }
});

// ***** HEALING ABILITIES ***** //
export const Heal: (replacer: HeroActionStringReplacer, opts?: HeroActionOpts) => HeroAction
                 = (replacer: HeroActionStringReplacer, opts: HeroActionOpts = {}) => ({
  staCost: () => opts.staCost || 5,
  spCost: () => opts.spCost || 10,
  targets: (targetting: HeroActionTargetting) => {
    const numTargets = opts.targets || 1;
    return sampleSize(targetting.livingAllies, numTargets) as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    const defMultiplier = opts.defMultiplier || 1;
    targets.forEach(target => {
      const healed = getCurrentStat(hero, HeroStat.DEF) * defMultiplier;
      heal(target, healed);

      const message = replacer.replace({ source: hero, target, value: healed });
      combat.addLogEntry(message);
    });
  }
});

export const HealPercent: (replacer: HeroActionStringReplacer, opts?: HeroActionOpts) => HeroAction
                        = (replacer: HeroActionStringReplacer, opts: HeroActionOpts = {}) => ({
  staCost: () => opts.staCost || 7,
  spCost: () => opts.spCost || 10,
  targets: (targetting: HeroActionTargetting) => {
    const numTargets = opts.targets || 1;
    return sampleSize(targetting.livingAllies, numTargets) as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    const pct = opts.pct || 1;

    targets.forEach(target => {
      const healed = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      heal(target, healed);

      const message = replacer.replace({ source: hero, target, value: healed });
      combat.addLogEntry(message);
    });
  }
});

export const HealSomeOrAll: (replacer: HeroActionStringReplacer, opts?: HeroActionOpts) => HeroAction
                          = (replacer: HeroActionStringReplacer, opts: HeroActionOpts = {}) => ({
  staCost: () => opts.staCost || 10,
  spCost: () => opts.spCost || 7,
  targets: (targetting: HeroActionTargetting) => {
    return targetting.livingAllies;
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    const defMultiplier = opts.defMultiplier || 1;
    targets.forEach(target => {
      const healed = getCurrentStat(hero, HeroStat.DEF) * defMultiplier;
      heal(target, healed);

      const message = replacer.replace({ source: hero, target, value: healed });
      combat.addLogEntry(message);
    });
  }
});

export const HealSomeOrAllPercent: (replacer: HeroActionStringReplacer, opts?: HeroActionOpts) => HeroAction
                                 = (replacer: HeroActionStringReplacer, opts: HeroActionOpts = {}) => ({
  staCost: () => opts.staCost || 10,
  spCost: () => opts.spCost || 7,
  targets: (targetting: HeroActionTargetting) => {
    return targetting.livingAllies;
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    const pct = opts.pct || 1;

    targets.forEach(target => {
      const healed = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
      heal(target, healed);

      const message = replacer.replace({ source: hero, target, value: healed });
      combat.addLogEntry(message);
    });
  }
});

// ***** GOLD ABILITIES ***** //
export const EarnGold: (replacer: HeroActionStringReplacer, opts?: HeroActionOpts) => HeroAction
                     = (replacer: HeroActionStringReplacer, opts: HeroActionOpts = {}) => ({
  staCost: () => opts.staCost || 5,
  spCost: () => opts.spCost || 3,
  targets: (targetting: HeroActionTargetting) => {
    return [targetting.self];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    const gold = opts.gold || 1;

    targets.forEach(target => {
      const earnedGold = target.currentStats[HeroStat.LVL] * gold;
      giveHeroGold(target, earnedGold);

      const message = replacer.replace({ source: hero, target, value: earnedGold });
      combat.addLogEntry(message);
    });
  }
});

export const Mug: (replacer: HeroActionStringReplacer, opts?: HeroActionOpts) => HeroAction
                = (replacer: HeroActionStringReplacer, opts: HeroActionOpts = {}) => ({
  staCost: () => opts.staCost || 10,
  spCost: () => opts.spCost || 7,
  targets: (targetting: HeroActionTargetting) => {
    return [sample(targetting.livingEnemies)] as Hero[];
  },
  act: (combat: Combat, hero: Hero, targets: Hero[]) => {
    const gold = opts.gold || 1;
    const defMultiplier = opts.defMultiplier || 1;
    const atkMultiplier = opts.atkMultiplier || 1;

    targets.forEach(target => {
      const earnedGold = target.currentStats[HeroStat.LVL] * gold;
      giveHeroGold(hero, earnedGold);

      const damage = calculateDamage(
        getCurrentStat(hero, HeroStat.ATK) * atkMultiplier,
        getCurrentStat(target, HeroStat.DEF) * defMultiplier
      );

      takeDamage(target, damage);

      const message = replacer.replace({ source: hero, target, value: damage, valuegold: earnedGold });
      combat.addLogEntry(message);
    });
  }
});
