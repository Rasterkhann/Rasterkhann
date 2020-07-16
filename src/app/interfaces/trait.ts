import { Hero, HeroStat } from './hero';

export enum TriggerType {

  // works for: Trait
  Spawn = 'onSpawn',

  // works for: Trait
  LevelUp = 'onLevelUp',

  // works for: HeroCombatTriggers (only if alive)
  PreCombat = 'onPreCombat',

  // works for: HeroCombatTriggers (only if alive)
  PostCombat = 'onPostCombat',

  // works for: HeroCombatTriggers (always)
  Victory = 'onVictory',

  // not currently implemented
  Death = 'onDeath',

  // not currently implemented
  PreAdventure = 'onPreAdventure'
}

export type BadTrait =
  'Weak' | 'Frail' | 'Ill' | 'Clumsy' | 'Reclusive' | 'Sedentary' | 'Poor' | 'Inexperienced';

export type SimpleModifierPositiveTrait =
  'ATK+' | 'DEF+' | 'STA+' | 'HP+' | 'SP+';

export type SimpleModifierNegativeTrait =
  'ATK-' | 'DEF-' | 'STA-';

export type FirstTierGoodTrait =
  'Strong' | 'Fortified' | 'Healthy' | 'Skilled' | 'Advanced' | 'Active' | 'Modest' | 'Experienced';

export type WeaponUseTrait =
  'Sword User' | 'Knife User' | 'Katar User' | 'Hatchet User' | 'Spear User' | 'Mace User'
| 'Staff User' | 'Shuriken User' | 'Wand User' | 'Shortbow User' | 'Longbow User';

export type GearTrait =
  'Multi-armed' | 'Tiny Body' | 'Big Satchel';

export type Trait =
  BadTrait | SimpleModifierPositiveTrait | SimpleModifierNegativeTrait
| FirstTierGoodTrait | WeaponUseTrait | GearTrait;

export enum TraitPriority {
  Any = 'any',
  Last = 'last'
}

export type TraitTriggerFunction = ({ hero, statBlock }: { hero: Hero, statBlock?: Record<HeroStat, number> }) => void;

export enum TraitValueProp {
  VeryBad = -5,
  Bad = -3,
  SlightlyBad = -1,
  Neutral = 0,
  SlightlyGood = 1,
  Good = 3,
  VeryGood = 5
}

export const TraitValueMultipliers: Record<TraitValueProp, number> = {
  [TraitValueProp.VeryBad]:       0.5,
  [TraitValueProp.Bad]:           0.75,
  [TraitValueProp.SlightlyBad]:   0.9,
  [TraitValueProp.Neutral]:       1,
  [TraitValueProp.SlightlyGood]:  1.1,
  [TraitValueProp.Good]:          1.25,
  [TraitValueProp.VeryGood]:      1.5
};

export interface TraitEffect {
  priority: TraitPriority;
  valueProp: TraitValueProp;
  description: string;
  triggers: Partial<Record<TriggerType, TraitTriggerFunction>>;
}
