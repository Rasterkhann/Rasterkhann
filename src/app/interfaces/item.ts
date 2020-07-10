
import { HeroStat } from './hero';

export type ItemTier = 'I' | 'II' | 'III' | 'IV' | 'V';

export enum ItemType {
  Weapon = 'Weapon',
  Armor = 'Armor',
  Potion = 'Potion'
}

export interface HeroItem {
  uuid: string;
  name: string;
  sprite: number;
  type: ItemType;
  boostStats: Array<{ stat: HeroStat, value: number }>;
  cost: bigint;
}
