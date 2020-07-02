
import { Trait, TraitEffect, HeroStat, TraitPriority, TraitValueProp } from '../interfaces';
import { ensureHeroStatValue } from '../helpers';

export const TraitEffects: Record<Trait, TraitEffect> = {
  Weak: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is weakened, -50% ATK.',
    triggers: {
      onSpawn: ({ hero }) => {
        hero.stats[HeroStat.ATK] /= 2;
        ensureHeroStatValue(hero, HeroStat.ATK, 1);
      }
    }
  },

  Frail: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is frail, -50% DEF.',
    triggers: {
      onSpawn: ({ hero }) => {
        hero.stats[HeroStat.DEF] /= 2;
        ensureHeroStatValue(hero, HeroStat.DEF, 1);
      }
    }
  },

  Ill: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is ill, -50% HP.',
    triggers: {
      onSpawn: ({ hero }) => {
        hero.stats[HeroStat.HP] /= 2;
        ensureHeroStatValue(hero, HeroStat.HP, 25);
      }
    }
  },

  Clumsy: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is clumsy, -50% SP.',
    triggers: {
      onSpawn: ({ hero }) => {
        hero.stats[HeroStat.SP] /= 2;
        ensureHeroStatValue(hero, HeroStat.SP, 5);
      }
    }
  },

  Reclusive: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is reclusive, -50% LVL.',
    triggers: {
      onSpawn: ({ hero }) => {
        hero.stats[HeroStat.LVL] /= 2;
        ensureHeroStatValue(hero, HeroStat.LVL, 1);
      }
    }
  },

  Sedentary: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is sedentary, -50% STA.',
    triggers: {
      onSpawn: ({ hero }) => {
        hero.stats[HeroStat.STA] /= 2;
        ensureHeroStatValue(hero, HeroStat.STA, 10);
      }
    }
  },

  Poor: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is poor, 0 GOLD.',
    triggers: {
      onSpawn: ({ hero }) => {
        hero.stats[HeroStat.GOLD] = 0;
        ensureHeroStatValue(hero, HeroStat.GOLD, 0);
      }
    }
  },

  Inexperienced: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is inexperienced, +50% EXP.',
    triggers: {
      onSpawn: ({ hero }) => {
        hero.stats[HeroStat.EXP] *= 2;
        ensureHeroStatValue(hero, HeroStat.EXP, 150);
      }
    }
  },
};
