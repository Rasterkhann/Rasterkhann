

import { sample } from 'lodash';
import { v4 as uuid } from 'uuid';

import { HeroItem, IGameTown, HeroStat, ItemType, ArmorElement, ArmorSubType, Building } from '../interfaces';
import { getZeroStatBlock } from './hero';
import { calculateItemCost, doesTownHaveFeature } from './global';
import { chooseRandomItemTrait } from './itemtraits';

const ARMOR_BASIC_SPRITE_COLOR_OFFSET: Partial<Record<ArmorElement, number>> = {
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

const ARMOR_BASIC_TYPE_OFFSET: Partial<Record<ArmorSubType, number>> = {
  [ArmorSubType.Cloak]: 1,
  [ArmorSubType.FurCloak]: 2,
  [ArmorSubType.RoyalCloak]: 3,
  [ArmorSubType.Fullplate]: 4,
  [ArmorSubType.TravelingCloak]: 5,
  [ArmorSubType.ArmoredCloak]: 6,
  [ArmorSubType.HideArmor]: 7
};

const BASIC_ARMOR_SPECIFIC_PRESETS = [
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

const ARMOR_CLOAK_PRESETS = [
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

const ARMOR_MEDIUM_PRESETS = [
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

const ARMOR_HEAVY_PRESETS = [
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

export function pickArmorPreset(town: IGameTown): { name: string, sprite: number, stats: Record<HeroStat, number> } {

  const presets: any[] = BASIC_ARMOR_SPECIFIC_PRESETS;
  if (doesTownHaveFeature(town, 'Cloaks'))        { presets.push(...ARMOR_CLOAK_PRESETS); }
  if (doesTownHaveFeature(town, 'Medium Armor'))  { presets.push(...ARMOR_MEDIUM_PRESETS); }
  if (doesTownHaveFeature(town, 'Heavy Armor'))   { presets.push(...ARMOR_HEAVY_PRESETS); }

  const preset = Object.assign({}, sample(presets));
  let name = preset.type;
  let sprite = preset.sprite;

  if (preset.color) {
    const width = 12;
    const color = preset.color();
    if (color !== ArmorElement.None) {
      name = `${color} ${name}`;
    }

    const subtypeOffset = ARMOR_BASIC_TYPE_OFFSET[preset.type as ArmorSubType] || 1;
    const colorOffset = ARMOR_BASIC_SPRITE_COLOR_OFFSET[color as ArmorElement] || 0;

    sprite = (subtypeOffset * width) + colorOffset;
  }

  return {
    name,
    sprite,
    stats: preset.stats
  };
}

export function generateArmor(town: IGameTown): HeroItem {

  const preset = pickArmorPreset(town);
  const trait = chooseRandomItemTrait(town);

  const boostStatHash: Record<HeroStat, number> = getZeroStatBlock();

  Object.keys(preset.stats).forEach((stat: HeroStat) => {
    boostStatHash[stat] = boostStatHash[stat] || 0;
    boostStatHash[stat] += preset.stats[stat] || 0;
  });

  if (trait) {
    preset.name = `${trait.name} ${preset.name}`;

    Object.keys(trait.stats).forEach((stat: HeroStat) => {
      boostStatHash[stat] = boostStatHash[stat] || 0;
      boostStatHash[stat] += trait.stats[stat] || 0;
    });
  }

  const boostStats = Object.keys(boostStatHash)
    .map((stat: HeroStat) => ({ stat, value: boostStatHash[stat] }))
    .filter(({ value }) => value !== 0)
    .map(obj => ({ ...obj, value: obj.value + town.buildings[Building.Armory].level }));

  let cost = calculateItemCost(town, boostStats) * 10n;
  if (cost < 0n) { cost = 1000n; }

  return {
    name: preset.name,
    uuid: uuid(),
    type: ItemType.Armor,
    sprite: preset.sprite,
    boostStats,
    cost
  };
}
