
import { Trait, TriggerType, TraitTriggerFunction } from './trait';
import { HeroItem } from './item';

export enum HeroJob {
  Adventurer = 'Adventurer',
  Warrior = 'Warrior',
  Cleric = 'Cleric',
  Thief = 'Thief',
  Mage = 'Mage'
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
  chooseName: () => string;
  sprites: string[];
  statBaseMultiplier: Record<HeroStat, number>;
  statGrowth: Record<HeroStat, (hero?: Hero) => number>;
  triggers: Partial<Record<TriggerType, TraitTriggerFunction>>;
  combatTriggers: Partial<Record<TriggerType, HeroJobAction[]>>;
  actions: HeroJobAction[];
}

export interface HeroJobActionTargetting {
  self: Hero;
  all: Hero[];
  allAllies: Hero[];
  livingAllies: Hero[];
  livingEnemies: Hero[];
}

export interface HeroJobAction {
  staCost: () => number;
  spCost: () => number;
  targets: (targetting: HeroJobActionTargetting) => Hero[];
  act: (hero: Hero, targets: Hero[]) => void;
}

export interface Hero {
  uuid: string;
  name: string;
  sprite: string;

  onAdventure: string;

  job: HeroJob;
  traits: Trait[];

  stats: Record<HeroStat, number>;
  currentStats: Record<HeroStat, number>;
  gear: Partial<Record<HeroGearSlot, HeroItem[]>>;
}

export interface ProspectiveHero {
  cost: bigint;
  rating: number;
  hero: Hero;
}
