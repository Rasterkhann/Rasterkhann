
import { HeroStat } from './hero';

export enum ItemType {
  Weapon = 'weapon',
  Armor = 'armor',
  Potion = 'potion'
}

export interface HeroItem {
  name: string;
  type: ItemType;
  boostStats: Array<{ stat: HeroStat, value: number }>;
}
