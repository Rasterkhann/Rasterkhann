
import { sample } from 'lodash';

import { ArmorElement, ArmorSubType, HeroStat } from '../interfaces';

export const ARMOR_BASIC_SPRITE_COLOR_OFFSET: Partial<Record<ArmorElement, number>> = {
  [ArmorElement.Red]: 0,
  [ArmorElement.Orange]: 1,
  [ArmorElement.Yellow]: 2,
  [ArmorElement.Green]: 3,
  [ArmorElement.Teal]: 4,
  [ArmorElement.Aqua]: 5,
  [ArmorElement.Purple]: 6,
  [ArmorElement.Pink]: 7,
  [ArmorElement.Brown]: 8,
  [ArmorElement.Black]: 9,
  [ArmorElement.Gray]: 10,
  [ArmorElement.White]: 11
};

export const ARMOR_BASIC_TYPE_OFFSET: Partial<Record<ArmorSubType, number>> = {
  [ArmorSubType.Cloak]: 1,
  [ArmorSubType.FurCloak]: 2,
  [ArmorSubType.RoyalCloak]: 3,
  [ArmorSubType.Fullplate]: 4,
  [ArmorSubType.TravelingCloak]: 5,
  [ArmorSubType.ArmoredCloak]: 6,
  [ArmorSubType.HideArmor]: 7
};

export const BASIC_ARMOR_SPECIFIC_PRESETS = [
  {
    type: ArmorSubType.Shirt,
    sprite: 0,
    stats: {
      [HeroStat.DEF]: 1
    }
  },
  {
    type: ArmorSubType.Fur,
    sprite: 1,
    stats: {
      [HeroStat.DEF]: 2
    }
  },
];

export const ARMOR_CLOAK_PRESETS = [
  {
    type: ArmorSubType.Cloak,
    color: () => sample(Object.keys(ArmorElement).filter(x => x !== ArmorElement.None)),
    stats: {
      [HeroStat.DEF]: 3,
      [HeroStat.STA]: 6
    }
  },
  {
    type: ArmorSubType.FurCloak,
    color: () => sample(Object.keys(ArmorElement).filter(x => x !== ArmorElement.None)),
    stats: {
      [HeroStat.DEF]: 4,
      [HeroStat.STA]: 4
    }
  },
  {
    type: ArmorSubType.TravelingCloak,
    color: () => sample(Object.keys(ArmorElement).filter(x => x !== ArmorElement.None)),
    stats: {
      [HeroStat.DEF]: 6,
      [HeroStat.STA]: 3
    }
  },
];

export const ARMOR_MEDIUM_PRESETS = [
  {
    type: ArmorSubType.RoyalCloak,
    color: () => sample(Object.keys(ArmorElement).filter(x => x !== ArmorElement.None)),
    stats: {
      [HeroStat.DEF]: 10
    }
  },
  {
    type: ArmorSubType.HideArmor,
    color: () => sample(Object.keys(ArmorElement).filter(x => x !== ArmorElement.None)),
    stats: {
      [HeroStat.DEF]: 15,
      [HeroStat.STA]: -2
    }
  }
];

export const ARMOR_HEAVY_PRESETS = [
  {
    type: ArmorSubType.ArmoredCloak,
    color: () => sample(Object.keys(ArmorElement).filter(x => x !== ArmorElement.None)),
    stats: {
      [HeroStat.DEF]: 20,
      [HeroStat.STA]: -5
    }
  },
  {
    type: ArmorSubType.Fullplate,
    color: () => sample(Object.keys(ArmorElement).filter(x => x !== ArmorElement.None)),
    stats: {
      [HeroStat.DEF]: 25,
      [HeroStat.STA]: -10
    }
  },
];
