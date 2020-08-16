
import { Trait, TraitEffect, HeroStat, TraitPriority, TraitValueProp, TriggerType, FirstTierGoodTrait,
  BadTrait, SimpleModifierPositiveTrait, SimpleModifierNegativeTrait, GearTrait, WeaponUseTrait,
  HeroJob, ArmorUseTrait, PlainTrait } from '../interfaces';
import { ensureHeroStatValue } from '../helpers/trait';
import { giveHeroGold } from '../helpers/global';

const PlainTraits: Record<PlainTrait, TraitEffect> = {
  Plain: {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero is plain, no special attributes.',
    triggers: {
    }
  },
};

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
    description: 'Hero is inexperienced, +50% EXP needed per level.',
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

const SimplePositiveTraits: Record<SimpleModifierPositiveTrait, TraitEffect> = {
  'ATK+': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero gets +10 ATK on spawn, +1 ATK per level',
    cantAttachWithTrait: ['ATK-'],
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.ATK] += 10;
        ensureHeroStatValue(hero, HeroStat.ATK, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.ATK] += 1;
      }
    }
  },
  'DEF+': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero gets +10 DEF on spawn, +1 DEF per level',
    cantAttachWithTrait: ['DEF-'],
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.DEF] += 10;
        ensureHeroStatValue(hero, HeroStat.DEF, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.DEF] += 1;
      }
    }
  },
  'HP+': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero gets +100 HP on spawn, +10 HP per level',
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.HP] += 100;
        ensureHeroStatValue(hero, HeroStat.HP, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.HP] += 10;
      }
    }
  },
  'SP+': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero gets +20 SP on spawn, +2 SP per level',
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.SP] += 20;
        ensureHeroStatValue(hero, HeroStat.SP, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.SP] += 2;
      }
    }
  },
  'STA+': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero gets +10 STA on spawn, +1 STA per level',
    cantAttachWithTrait: ['STA-'],
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.STA] += 10;
        ensureHeroStatValue(hero, HeroStat.STA, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.STA] += 1;
      }
    }
  },
  Careful: {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero takes 50% less durability damage',
    cantAttachWithTrait: ['Reckless'],
    triggers: {}
  }
};

const SimpleNegativeTraits: Record<SimpleModifierNegativeTrait, TraitEffect> = {
  'ATK-': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.SlightlyBad,
    description: 'Hero gets -10 ATK on spawn, -1 ATK per level',
    cantAttachWithTrait: ['ATK+'],
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.ATK] -= 10;
        ensureHeroStatValue(hero, HeroStat.ATK, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.ATK] -= 1;
      }
    }
  },
  'DEF-': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.SlightlyBad,
    description: 'Hero gets -10 DEF on spawn, -1 DEF per level',
    cantAttachWithTrait: ['DEF+'],
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.DEF] -= 10;
        ensureHeroStatValue(hero, HeroStat.DEF, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.DEF] -= 1;
      }
    }
  },
  'STA-': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.SlightlyBad,
    description: 'Hero gets -10 STA on spawn, -1 STA per level',
    cantAttachWithTrait: ['STA+'],
    triggers: {
      [TriggerType.Spawn]: ({ hero }) => {
        hero.stats[HeroStat.STA] -= 10;
        ensureHeroStatValue(hero, HeroStat.STA, 1);
      },
      [TriggerType.LevelUp]: ({ statBlock }) => {
        if (!statBlock) { return; }
        statBlock[HeroStat.STA] -= 1;
      }
    }
  },
  Reckless: {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.SlightlyBad,
    description: 'Hero takes 50% more durability damage',
    cantAttachWithTrait: ['Careful'],
    triggers: {}
  }
};

const FirstTierGoodTraits: Record<FirstTierGoodTrait, TraitEffect> = {
  Strong: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero is strong, +15% ATK.',
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
        giveHeroGold(hero, 500);
        ensureHeroStatValue(hero, HeroStat.GOLD, 0);
      },
      [TriggerType.LevelUp]: ({ hero, statBlock }) => {
        if (!statBlock) { return; }
        giveHeroGold(hero, 50);
      }
    }
  },

  Experienced: {
    priority: TraitPriority.Last,
    valueProp: TraitValueProp.SlightlyGood,
    description: 'Hero is experienced, -15% EXP needed per level.',
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

export const WeaponTraits: Record<WeaponUseTrait, TraitEffect> = {
  'Sword User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use swords.',
    cantAttachToClass: [HeroJob.Warrior, HeroJob.Adventurer],
    triggers: {}
  },
  'Knife User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use knives.',
    cantAttachToClass: [HeroJob.Thief, HeroJob.Adventurer],
    triggers: {}
  },
  'Katar User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use katars.',
    cantAttachToClass: [HeroJob.Thief],
    triggers: {}
  },
  'Hatchet User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use hatchets.',
    cantAttachToClass: [HeroJob.Warrior, HeroJob.Adventurer],
    triggers: {}
  },
  'Spear User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use spears.',
    cantAttachToClass: [HeroJob.Warrior],
    triggers: {}
  },
  'Mace User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use maces.',
    cantAttachToClass: [HeroJob.Warrior, HeroJob.Cleric],
    triggers: {}
  },
  'Staff User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use staves.',
    cantAttachToClass: [HeroJob.Mage, HeroJob.Cleric],
    triggers: {}
  },
  'Shuriken User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use shuriken.',
    cantAttachToClass: [HeroJob.Thief],
    triggers: {}
  },
  'Wand User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use wands.',
    cantAttachToClass: [HeroJob.Mage],
    triggers: {}
  },
  'Shortbow User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use shortbows.',
    cantAttachToClass: [HeroJob.Adventurer],
    triggers: {}
  },
  'Longbow User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use longbows.',
    cantAttachToClass: [HeroJob.Adventurer],
    triggers: {}
  },
};

export const ArmorTraits: Record<ArmorUseTrait, TraitEffect> = {
  'Light Armor User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use light armor.',
    cantAttachToClass: [HeroJob.Adventurer, HeroJob.Mage, HeroJob.Thief],
    triggers: {}
  },
  'Medium Armor User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use medium armor.',
    cantAttachToClass: [HeroJob.Adventurer, HeroJob.Cleric, HeroJob.Thief],
    triggers: {}
  },
  'Heavy Armor User': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.Neutral,
    description: 'Hero can additionally use heavy armor.',
    cantAttachToClass: [HeroJob.Warrior, HeroJob.Cleric],
    triggers: {}
  },
};

export const GearTraits: Record<GearTrait, TraitEffect> = {
  'Multi-armed': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.VeryGood,
    description: 'Hero can hold an additional weapon.',
    triggers: {}
  },

  'Tiny Body': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.VeryGood,
    description: 'Hero can wear an additional armor.',
    triggers: {}
  },

  'Big Satchel': {
    priority: TraitPriority.Any,
    valueProp: TraitValueProp.VeryGood,
    description: 'Hero can hold an additional potion.',
    triggers: {}
  }
};

export const TraitEffects: Record<Trait, TraitEffect> = {
  ...PlainTraits,
  ...BaseBadTraits,
  ...SimplePositiveTraits,
  ...SimpleNegativeTraits,
  ...FirstTierGoodTraits,
  ...WeaponTraits,
  ...ArmorTraits,
  ...GearTraits
};
