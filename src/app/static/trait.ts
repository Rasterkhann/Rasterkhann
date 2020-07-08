
import { Trait, TraitEffect, HeroStat, TraitPriority, TraitValueProp, TriggerType, FirstTierGoodTrait, BadTrait } from '../interfaces';
import { ensureHeroStatValue } from '../helpers/trait';

const BaseBadTraits: Record<BadTrait, TraitEffect> = {
  Weak: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.VeryBad,
    description: 'Hero is weakened, -50% ATK.',
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.ATK] /= 2;
        ensureHeroStatValue(hero, HeroStat.ATK, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
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
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.DEF] /= 2;
        ensureHeroStatValue(hero, HeroStat.DEF, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
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
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.HP] /= 2;
        ensureHeroStatValue(hero, HeroStat.HP, 25);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
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
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.SP] /= 2;
        ensureHeroStatValue(hero, HeroStat.SP, 5);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
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
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.LVL] /= 2;
        ensureHeroStatValue(hero, HeroStat.LVL, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
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
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.STA] /= 2;
        ensureHeroStatValue(hero, HeroStat.STA, 10);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
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
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.GOLD] = 0;
        ensureHeroStatValue(hero, HeroStat.GOLD, 0);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
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
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.EXP] *= 2;
        ensureHeroStatValue(hero, HeroStat.EXP, 150);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.EXP] *= 2;
      }
    }
  },
};

const FirstTierGoodTraits: Record<FirstTierGoodTrait, TraitEffect> = {
  Strong: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero is weakened, +15% ATK.',
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.ATK] *= 1.15;
        ensureHeroStatValue(hero, HeroStat.ATK, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.ATK] *= 1.15;
      }
    }
  },

  Fortified: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero is fortified, +15% DEF.',
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.DEF] *= 1.15;
        ensureHeroStatValue(hero, HeroStat.DEF, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.DEF] *= 1.15;
      }
    }
  },

  Healthy: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero is healthy, +15% HP.',
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.HP] *= 1.15;
        ensureHeroStatValue(hero, HeroStat.HP, 25);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.HP] *= 1.15;
      }
    }
  },

  Skilled: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero is skilled, +15% SP.',
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.SP] *= 1.15;
        ensureHeroStatValue(hero, HeroStat.SP, 5);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.SP] *= 1.15;
      }
    }
  },

  Advanced: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero is advanced, +15% LVL (spawn only). -15% EXP (levelup only)',
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.LVL] *= 1.15;
        ensureHeroStatValue(hero, HeroStat.LVL, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.EXP] *= 0.85;
      }
    }
  },

  Active: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero is active, +15% STA.',
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.STA] *= 1.15;
        ensureHeroStatValue(hero, HeroStat.STA, 10);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.STA] *= 1.15;
      }
    }
  },

  Modest: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero is modest, +500 GOLD (spawn only). +50 GOLD (levelup only).',
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.GOLD] += 500;
        ensureHeroStatValue(hero, HeroStat.GOLD, 0);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.GOLD] += 50;
      }
    }
  },

  Experienced: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero is experienced, -15% EXP.',
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.EXP] *= 0.85;
        ensureHeroStatValue(hero, HeroStat.EXP, 150);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.EXP] *= 0.85;
      }
    }
  },
};

export const TraitEffects: Record<Trait, TraitEffect> = {
  ...BaseBadTraits,
  ...FirstTierGoodTraits
};