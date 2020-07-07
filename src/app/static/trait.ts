
import { Trait, TraitEffect, HeroStat, TraitPriority, TraitValueProp, TraitTrigger } from '../interfaces';
import { ensureHeroStatValue } from '../helpers/trait';

export const TraitEffects: Record<Trait, TraitEffect> = {
  Weak: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is weakened, -50% ATK.',
    triggers: {
      [TraitTrigger.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.ATK] /= 2;
        ensureHeroStatValue(hero, HeroStat.ATK, 1);
      },
      [TraitTrigger.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.ATK] /= 2;
      }
    }
  },

  Frail: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is frail, -50% DEF.',
    triggers: {
      [TraitTrigger.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.DEF] /= 2;
        ensureHeroStatValue(hero, HeroStat.DEF, 1);
      },
      [TraitTrigger.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.DEF] /= 2;
      }
    }
  },

  Ill: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is ill, -50% HP.',
    triggers: {
      [TraitTrigger.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.HP] /= 2;
        ensureHeroStatValue(hero, HeroStat.HP, 25);
      },
      [TraitTrigger.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.HP] /= 2;
      }
    }
  },

  Clumsy: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is clumsy, -50% SP.',
    triggers: {
      [TraitTrigger.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.SP] /= 2;
        ensureHeroStatValue(hero, HeroStat.SP, 5);
      },
      [TraitTrigger.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.SP] /= 2;
      }
    }
  },

  Reclusive: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is reclusive, -50% LVL (spawn only). +25% EXP (levelup only)',
    triggers: {
      [TraitTrigger.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.LVL] /= 2;
        ensureHeroStatValue(hero, HeroStat.LVL, 1);
      },
      [TraitTrigger.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.EXP] *= 1.25;
      }
    }
  },

  Sedentary: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is sedentary, -50% STA.',
    triggers: {
      [TraitTrigger.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.STA] /= 2;
        ensureHeroStatValue(hero, HeroStat.STA, 10);
      },
      [TraitTrigger.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.STA] /= 2;
      }
    }
  },

  Poor: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is poor, 0 GOLD (spawn only). -50% GOLD (levelup only).',
    triggers: {
      [TraitTrigger.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.GOLD] = 0;
        ensureHeroStatValue(hero, HeroStat.GOLD, 0);
      },
      [TraitTrigger.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.GOLD] /= 2;
      }
    }
  },

  Inexperienced: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is inexperienced, +50% EXP.',
    triggers: {
      [TraitTrigger.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.EXP] *= 2;
        ensureHeroStatValue(hero, HeroStat.EXP, 150);
      },
      [TraitTrigger.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.EXP] *= 2;
      }
    }
  },
};