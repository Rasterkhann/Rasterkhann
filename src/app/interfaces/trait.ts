import { Hero, HeroStat } from './hero';

export type Trait =
  'Weak' | 'Frail' | 'Ill' | 'Clumsy' | 'Reclusive' | 'Sedentary' | 'Poor' | 'Inexperienced';

export enum TraitTrigger {
  Spawn = 'onSpawn',
  LevelUp = 'onLevelUp',
  PreCombat = 'onPreCombat',
  Victory = 'onVictory',
  Death = 'onDeath',
  PreAdventure = 'onPreAdventure'
}

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
  triggers: Partial<Record<TraitTrigger, TraitTriggerFunction>>;
}
