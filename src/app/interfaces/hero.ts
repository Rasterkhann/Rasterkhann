
import { Trait, TraitTrigger, TraitTriggerFunction } from './trait';
import { HeroItem } from './item';

export enum HeroJob {
  Adventurer = 'adventurer',
  Warrior = 'warrior',
  Cleric = 'cleric',
  Thief = 'thief',
  Mage = 'mage'
}

export enum HeroStat {
  HP = 'hp',
  SP = 'sp',
  ATK = 'atk',
  DEF = 'def',
  LVL = 'lvl',
  EXP = 'exp',
  STA = 'sta',
  GOLD = 'gold'
}

export enum HeroGearSlot {
  Weapon = 'weapon',
  Armor = 'armor',
  Potion = 'potion'
}

export interface HeroJobStatic {
  description: string;
  statBaseMultiplier: Record<HeroStat, number>;
  statGrowth: Partial<Record<HeroStat, (hero: Hero) => number>>;
  triggers: Partial<Record<TraitTrigger, TraitTriggerFunction>>;
}

export interface Hero {
  name: string;
  sprite: string;

  job: HeroJob;
  traits: Trait[];

  stats: Record<HeroStat, number>;
  currentStats: Record<HeroStat, number>;
  gear: Record<HeroGearSlot, HeroItem[]>;
}
