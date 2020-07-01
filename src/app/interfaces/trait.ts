
export type Trait =
  'Weak' | 'Frail' | 'Ill' | 'Clumsy' | 'Reclusive' | 'Sedentary' | 'Poor' | 'Inexperienced';

export type TraitTrigger =
  'onSpawn' | 'onPreCombat' | 'onVictory' | 'onDeath' | 'onPreAdventure';

export enum TraitPriority {
  Any = 'any',
  Last = 'last'
}

export type TraitTriggerFunction = ({ hero: Hero }) => void;

export enum TraitValueProp {
  VeryBad = -5,
  Bad = -3,
  SlightlyBad = -1,
  Neutral = 0,
  SlightlyGood = 1,
  Good = 3,
  VeryGood = 5
}

export interface TraitEffect {
  priority: TraitPriority;
  valueProp: TraitValueProp;
  description: string;
  triggers: Partial<Record<TraitTrigger, TraitTriggerFunction>>;
}
