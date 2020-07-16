
import { HeroStat } from './hero';

export type ItemTier = 'I' | 'II' | 'III' | 'IV' | 'V';

export type ItemTrait = 'Hard' | 'Guarding' | 'Armored' | 'Warding'
| 'Jagged' | 'Spiked' | 'Angry' | 'Menacing'
| 'Wild' | 'Rash' | 'Intrepid' | 'Violent'
| 'Magical' | 'Arcane' | 'Mystic' | 'Adept' | 'Masterful' | 'Celestial'| 'Manic'
| 'Keen' | 'Superior' | 'Forceful' | 'Hurtful' | 'Healthy' | 'Salubrious'
| 'Strong' | 'Demonic' | 'Zealous' | 'Quick' | 'Deadly'
| 'Murderous' | 'Large' | 'Massive' | 'Gigantic'
| 'Dangerous' | 'Savage' | 'Sharp' | 'Pointy'
| 'Staunch' | 'Powerful' | 'Precise' | 'Lucky'
| 'Broken' | 'Damaged' | 'Destroyed' | 'Shoddy'
| 'Unpleasant' | 'Ruthless' | 'Slow' | 'Sluggish'
| 'Lazy' | 'Annoying' | 'Bad' | 'Tiny' | 'Terrible'
| 'Small' | 'Dull' | 'Bulky' | 'Heavy'
| 'Awful' | 'Awkward' | 'Deranged' | 'Inept';

export enum ItemType {
  Weapon = 'Weapon',
  Armor = 'Armor',
  Potion = 'Potion'
}

export enum WeaponSubType {
  Sword = 'Sword',
  Knife = 'Knife',
  Katar = 'Katar',
  Hatchet = 'Hatchet',
  Spear = 'Spear',
  Mace = 'Mace',
  Staff = 'Staff',
  Shuriken = 'Shuriken',
  Wand = 'Wand',
  Arrow = 'Arrow',
  Shortbow = 'Shortbow',
  Longbow = 'Longbow'
}

export enum WeaponElement {
  Iron = 'Iron',
  Fire = 'Fire',
  Ice = 'Ice',
  Wind = 'Wind',
  Earth = 'Earth',
  Lightning = 'Lightning',
  Shadetin = 'Shadetin',
  Darksteel = 'Darksteel',
  Brightgold = 'Brightgold',
  Obsidiron = 'Obsidiron',
  Melfrost = 'Melfrost'
}

export enum ArmorSubType {
  Shirt = 'Shirt',
  Fur = 'Fur',
  Cloak = 'Cloak',
  FurCloak = 'Fur Cloak',
  RoyalCloak = 'Royal Cloak',
  Fullplate = 'Fullplate',
  TravelingCloak = 'Traveling Cloak',
  ArmoredCloak = 'Armored Cloak',
  HideArmor = 'Hide Armor',
  LeatherArmor = 'Leather Armor'
}

export enum ArmorElement {
  None = 'None',
  Red = 'Red',
  Orange = 'Orange',
  Yellow = 'Yellow',
  Green = 'Green',
  Teal = 'Teal',
  Aqua = 'Aqua',
  Purple = 'Purple',
  Pink = 'Pink',
  Brown = 'Brown',
  Black = 'Black',
  Gray = 'Gray',
  White = 'White'
}

export interface HeroItem {
  uuid: string;
  name: string;
  sprite: number;
  type: ItemType;
  boostStats: Array<{ stat: HeroStat, value: number }>;
  cost: bigint;
  timesPassedOver: number;
}

export interface HeroWeapon extends HeroItem {
  subType: WeaponSubType;
  element: WeaponElement;
}

export interface HeroArmor extends HeroItem {
  subType: ArmorSubType;
  element: ArmorElement;
}
