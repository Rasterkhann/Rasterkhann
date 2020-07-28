
import { sample, sampleSize, random } from 'lodash';

import { Combat, Hero, HeroAction, HeroActionTargetting, HeroStat,
  HeroActionStringReplacer, HeroActionOpts, ItemType } from '../interfaces';
import { getCurrentStat, giveHeroGold, doesHeroHaveTrait } from '../helpers/global';
import { decreaseDurability } from '../helpers/durability';

function heal(creature: Hero, healed: number): void {
  creature.currentStats[HeroStat.HP] = Math.min(creature.stats[HeroStat.HP], creature.currentStats[HeroStat.HP] + healed);
}

function takeDamage(attacker: Hero, defender: Hero, damage: number): void {
  defender.currentStats[HeroStat.HP] = Math.max(0, defender.currentStats[HeroStat.HP] - damage);
  takeRandomArmorDamage(defender);
  takeRandomWeaponDamage(attacker);
}

function calculateDamage(atk: number, def: number): number {
  return Math.floor(Math.max(1, random(-def, atk)));
}

function takeRandomArmorDamage(creature: Hero): void {
  const armorItem = sample(creature.gear[ItemType.Armor]);
  if (!armorItem) { return; }

  let base = 2;
  if (doesHeroHaveTrait(creature, 'Reckless')) { base += 1; }
  if (doesHeroHaveTrait(creature, 'Careful'))  { base -= 1; }

  decreaseDurability(creature, armorItem, base);
}

function takeRandomWeaponDamage(creature: Hero): void {
  const weaponItem = sample(creature.gear[ItemType.Weapon]);
  if (!weaponItem) { return; }

  let base = 2;
  if (doesHeroHaveTrait(creature, 'Reckless')) { base += 1; }
  if (doesHeroHaveTrait(creature, 'Careful'))  { base -= 1; }

  decreaseDurability(creature, weaponItem, base);
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
    const times = opts.times || 1;

    for (let i = 0; i < times; i++) {
      targets.forEach(target => {
        const damage = calculateDamage(
          getCurrentStat(hero, HeroStat.ATK) * atkMultiplier,
          getCurrentStat(target, HeroStat.DEF) * defMultiplier
        );

        takeDamage(hero, target, damage);

        const message = replacer.replace({ source: hero, target, value: damage });
        combat.addLogEntry(message);
      });
    }
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
    const times = opts.times || 1;

    for (let i = 0; i < times; i++) {
      targets.forEach(target => {
        const damage = calculateDamage(
          getCurrentStat(hero, HeroStat.ATK) * atkMultiplier,
          getCurrentStat(target, HeroStat.DEF) * defMultiplier
        );

        takeDamage(hero, target, damage);

        const message = replacer.replace({ source: hero, target, value: damage });
        combat.addLogEntry(message);
      });
    }
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
    const times = opts.times || 1;

    for (let i = 0; i < times; i++) {
      targets.forEach(target => {
        const damage = calculateDamage(
          (getCurrentStat(hero, HeroStat.ATK) / targets.length) * atkMultiplier,
          getCurrentStat(target, HeroStat.DEF) * defMultiplier
        );

        takeDamage(hero, target, damage);

        const message = replacer.replace({ source: hero, target, value: damage });
        combat.addLogEntry(message);
      });
    }
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
    const times = opts.times || 1;

    for (let i = 0; i < times; i++) {
      targets.forEach(target => {
        const damage = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
        takeDamage(hero, target, damage);

        const message = replacer.replace({ source: hero, target, value: damage });
        combat.addLogEntry(message);
      });
    }
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
    const times = opts.times || 1;

    for (let i = 0; i < times; i++) {
      targets.forEach(target => {
        const damage = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
        takeDamage(hero, target, damage);

        const message = replacer.replace({ source: hero, target, value: damage });
        combat.addLogEntry(message);
      });
    }
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
    const times = opts.times || 1;

    for (let i = 0; i < times; i++) {
      targets.forEach(target => {
        const healed = getCurrentStat(hero, HeroStat.DEF) * defMultiplier;
        heal(target, healed);

        const message = replacer.replace({ source: hero, target, value: healed });
        combat.addLogEntry(message);
      });
    }
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
    const times = opts.times || 1;

    for (let i = 0; i < times; i++) {
      targets.forEach(target => {
        const healed = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
        heal(target, healed);

        const message = replacer.replace({ source: hero, target, value: healed });
        combat.addLogEntry(message);
      });
    }
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
    const times = opts.times || 1;

    for (let i = 0; i < times; i++) {
      targets.forEach(target => {
        const healed = getCurrentStat(hero, HeroStat.DEF) * defMultiplier;
        heal(target, healed);

        const message = replacer.replace({ source: hero, target, value: healed });
        combat.addLogEntry(message);
      });
    }
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
    const times = opts.times || 1;

    for (let i = 0; i < times; i++) {
      targets.forEach(target => {
        const healed = Math.floor(getCurrentStat(target, HeroStat.HP) * (pct / 100));
        heal(target, healed);

        const message = replacer.replace({ source: hero, target, value: healed });
        combat.addLogEntry(message);
      });
    }
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
    const times = opts.times || 1;

    for (let i = 0; i < times; i++) {
      targets.forEach(target => {
        const earnedGold = target.currentStats[HeroStat.LVL] * gold;
        giveHeroGold(target, earnedGold);

        const message = replacer.replace({ source: hero, target, value: earnedGold });
        combat.addLogEntry(message);
      });
    }
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
    const times = opts.times || 1;

    for (let i = 0; i < times; i++) {
      targets.forEach(target => {
        const earnedGold = target.currentStats[HeroStat.LVL] * gold;
        giveHeroGold(hero, earnedGold);

        const damage = calculateDamage(
          getCurrentStat(hero, HeroStat.ATK) * atkMultiplier,
          getCurrentStat(target, HeroStat.DEF) * defMultiplier
        );

        takeDamage(hero, target, damage);

        const message = replacer.replace({ source: hero, target, value: damage, valuegold: earnedGold });
        combat.addLogEntry(message);
      });
    }
  }
});
