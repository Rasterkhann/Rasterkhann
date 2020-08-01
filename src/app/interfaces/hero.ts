
import { Trait, TriggerType, TraitTriggerFunction } from './trait';
import { ArmorWeight, HeroArmor, HeroItem, HeroWeapon, ItemType, WeaponSubType } from './item';
import { Combat } from './adventure';
import { Building } from './buildings';

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

export enum HeroTrackedStat {
  TotalAdventures = 'Adventures (Total)',
  TotalEncounters = 'Encounters (Total)',
  AdventuresSucceeded = 'Adventures (Won)',
  EncountersSucceeded = 'Encounters (Won)',
  ItemsBought = 'Items Bought',
  PotionsUsed = 'Potions Used',
  GoldEarned = 'GOLD Earned',
  EXPEarned = 'EXP Earned',
  OddJobsDone = 'Odd Jobs',
  OddJobsMoney = 'Odd Jobs Earnings'
}

export interface HeroJobStatic {
  description: string;
  chooseName: () => string;
  sprites: string[];
  costMultiplier: number;
  statBaseMultiplier: Record<HeroStat, number>;
  statGrowth: Record<HeroStat, (level: number) => number>;
  triggers: Partial<Record<TriggerType, TraitTriggerFunction>>;
  combatTriggers: Partial<Record<TriggerType, HeroAction[]>>;
  actions: (hero: Hero) => HeroAction[];
  validWeaponTypes: WeaponSubType[];
  validArmorClasses: ArmorWeight[];
}

export interface HeroActionTargetting {
  self: Hero;
  all: Hero[];
  allAllies: Hero[];
  livingAllies: Hero[];
  livingEnemies: Hero[];
}

export interface HeroAction {
  staCost: () => number;
  spCost: () => number;
  targets: (targetting: HeroActionTargetting) => Hero[];
  act: (combat: Combat, hero: Hero, targets: Hero[]) => void;
}

export interface HeroActionReplaceOpts {
  source: Hero;
  target: Hero;
  value: number;
  valuegold?: number;
}

export interface HeroActionStringReplacer {
  replace: (opts: HeroActionReplaceOpts) => string;
}

export interface HeroActionOpts {
  staCost?: number;
  spCost?: number;
  pct?: number;
  gold?: number;
  defMultiplier?: number;
  atkMultiplier?: number;
  targets?: number;
  times?: number;
}

export interface HeroGear {
  [ItemType.Potion]: HeroItem[];
  [ItemType.Armor]: HeroArmor[];
  [ItemType.Weapon]: HeroWeapon[];
}

export interface Hero {
  uuid: string;
  name: string;
  sprite: string;

  onAdventure: string;
  currentlyWorkingAt: Building | null;
  currentlyWorkingTicks: number;
  currentlyWorkingEarned: number;

  currentlyAtBuilding: Building | null;
  goingToBuilding: Building | null;

  job: HeroJob;
  traits: Trait[];

  stats: Record<HeroStat, number>;
  currentStats: Record<HeroStat, number>;
  gear: HeroGear;

  trackedStats: Record<HeroTrackedStat, number>;

  queueDismissed: boolean;
  queueRetired: boolean;
}

export interface ProspectiveHero {
  cost: bigint;
  rating: number;
  hero: Hero;
}
