
import { sample, random } from 'lodash';

import { Hero, HeroJobAction, HeroJobActionTargetting, HeroStat } from '../interfaces';

function getCurrentStat(hero: Hero, stat: HeroStat): number {
  return hero.currentStats[stat];
}

function takeDamage(creature: Hero, damage: number): void {
  creature.currentStats[HeroStat.HP] = Math.max(0, creature.currentStats[HeroStat.HP] - damage);
}

function calculateDamage(atk: number, def: number): number {
  return Math.max(1, random(-def, atk));
}

export const Attack: HeroJobAction = {
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
};
