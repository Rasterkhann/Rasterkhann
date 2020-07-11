
import { Trait, TriggerType, TraitTriggerFunction } from './trait';
import { HeroItem, ItemType } from './item';

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

export interface HeroJobStatic {
  description: string;
  chooseName: () => string;
  sprites: string[];
  costMultiplier: number;
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
  gear: Record<ItemType, HeroItem[]>;
}

export interface ProspectiveHero {
  cost: bigint;
  rating: number;
  hero: Hero;
}
