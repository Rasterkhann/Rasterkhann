import { clamp, random } from 'lodash';

import { Hero, HeroItem } from '../interfaces';

export function removeItemStats(hero: Hero, item: HeroItem): void {
  item.boostStats.forEach(({ stat, value }) => {
    hero.stats[stat] -= value;
    hero.currentStats[stat] -= value;
  });
}

export function addItemStats(hero: Hero, item: HeroItem): void {
  item.boostStats.forEach(({ stat, value }) => {
    hero.stats[stat] += value;
    hero.currentStats[stat] += value;
  });
}

export function increaseDurability(hero: Hero, item: HeroItem, gain: number = 1): void {
  const curDurability = item.curDurability;

  item.curDurability = clamp(item.curDurability + gain, 0, item.maxDurability);

  // lose stats
  if (item.curDurability === 0 && curDurability !== 0) {
    removeItemStats(hero, item);

  // regain stats
  } else if (item.curDurability !== 0 && curDurability === 0) {
    addItemStats(hero, item);

  }

  // randomly lose max durability/value
  if (gain > 0 && item.maxDurability > 25 && item.curDurability < item.maxDurability && random(1, 10) === 1) {
    item.cost -= (item.cost / 100n);
    item.maxDurability -= 1;
  }
}

export function decreaseDurability(hero: Hero, item: HeroItem, loss: number = 2): void {
  increaseDurability(hero, item, -loss);
}
