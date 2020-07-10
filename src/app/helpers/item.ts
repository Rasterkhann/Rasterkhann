
import { random, sample, sum } from 'lodash';
import { v4 as uuid } from 'uuid';

import { HeroItem, IGameTown, HeroStat, ItemTier, ItemType, Building } from '../interfaces';
import { doesTownHaveFeature } from './global';

const buildingsRequiredPerItemType = {
  [ItemType.Potion]: Building.Alchemist,
  [ItemType.Weapon]: Building.Armory,
  [ItemType.Armor]:  Building.Armory
};

// calculator helper functions
export function calculateMaxCreatableItems(town: IGameTown, itemType: ItemType): number {
  if (itemType === ItemType.Armor || itemType === ItemType.Weapon) { return 0; }

  let base = 0;

  if (town.buildings[buildingsRequiredPerItemType[itemType]].level > 0) { base += 3; }
  if (doesTownHaveFeature(town, `More ${itemType}s I`))                 { base += 2; }
  if (doesTownHaveFeature(town, `More ${itemType}s II`))                { base += 2; }
  if (doesTownHaveFeature(town, `More ${itemType}s III`))               { base += 2; }

  return base;
}

export function calculateSecondsUntilNextItem(town: IGameTown, itemType: ItemType): number {
  let base = 0;

  if (town.buildings[buildingsRequiredPerItemType[itemType]].level > 0) { base += 1800; }
  if (doesTownHaveFeature(town, `Faster ${itemType} Creation I`))       { base -= 300; }
  if (doesTownHaveFeature(town, `Faster ${itemType} Creation II`))      { base -= 300; }
  if (doesTownHaveFeature(town, `Faster ${itemType} Creation III`))     { base -= 300; }

  return base;
}

// generic item functions
function calculateItemCost(boostStats: Array<{ stat: HeroStat, value: number }>): bigint {
  const statMultipliers: Record<HeroStat, number> = {
    [HeroStat.ATK]: 150,
    [HeroStat.DEF]: 120,
    [HeroStat.EXP]: 300,
    [HeroStat.GOLD]: 300,
    [HeroStat.LVL]: 1000,
    [HeroStat.SP]: 50,
    [HeroStat.HP]: 100,
    [HeroStat.STA]: 200
  };

  return BigInt(sum(boostStats.map(({ stat, value }) => value * statMultipliers[stat])));
}

// potion functions
function pickPotionSprite(statsModified: HeroStat[], tier: ItemTier): number {

  const getTierSprite = (col: number) => {

    // get the row for each tier
    const tierSprites: Record<ItemTier, number> = {
      I: 15,
      II: 16,
      III: 6,
      IV: 3,
      V: 5
    };

    const width = 14;

    return (width * tierSprites[tier]) + col;
  };

  const hasHP = statsModified.includes(HeroStat.HP);
  const hasSP = statsModified.includes(HeroStat.SP);
  const hasSTA = statsModified.includes(HeroStat.STA);

  // single-ingredient potions
  if (hasHP && !hasSP && !hasSTA) { return getTierSprite(0); }
  if (!hasHP && !hasSP && hasSTA) { return getTierSprite(1); }
  if (!hasHP && hasSP && !hasSTA) { return getTierSprite(3); }

  // dual-ingredient potions
  if (hasHP && hasSP && !hasSTA)  { return getTierSprite(4); }
  if (hasHP && !hasSP && hasSTA)  { return getTierSprite(2); }
  if (hasHP && hasSP && !hasSTA)  { return getTierSprite(5); }

  // tri-ingredient potions
  if (hasHP && hasSP && hasSTA)   { return getTierSprite(6); }

  // first broken bottle sprite
  return 13;
}

export function generatePotion(town: IGameTown): HeroItem {

  // stat combos
  const potentialStatCombos = [
    [HeroStat.HP]
  ];

  if (doesTownHaveFeature(town, 'Skill Potions I')) { potentialStatCombos.push([HeroStat.SP]); }
  if (doesTownHaveFeature(town, 'Stamina Potions I')) { potentialStatCombos.push([HeroStat.STA]); }

  if (doesTownHaveFeature(town, 'Two-color Potions')) {
    potentialStatCombos.push([HeroStat.HP, HeroStat.SP]);
    potentialStatCombos.push([HeroStat.HP, HeroStat.STA]);
    potentialStatCombos.push([HeroStat.SP, HeroStat.STA]);
  }

  if (doesTownHaveFeature(town, 'Three-color Potions')) {
    potentialStatCombos.push([HeroStat.HP, HeroStat.SP, HeroStat.STA]);
  }

  const chosenStatCombo = sample(potentialStatCombos) as HeroStat[];

  // stat values
  const tierRanges: Record<ItemTier, { min: number, max: number }> = {
    I:   { min: 10,   max: 25 },
    II:  { min: 25,   max: 75 },
    III: { min: 75,   max: 150 },
    IV:  { min: 150,  max: 250 },
    V:   { min: 250,  max: 400 },
  };

  // get the name for the stat
  const statToPotion: Partial<Record<HeroStat, string>> = {
    [HeroStat.HP]: 'Health',
    [HeroStat.SP]: 'Skill',
    [HeroStat.STA]: 'Stamina'
  };

  let itemTier: ItemTier = 'I';

  const boostStats = chosenStatCombo.map((stat: HeroStat) => {
    let value = 0;

    // there is no "Healing Potions I" so it gets a default value
    if (stat === HeroStat.HP) { value = random(tierRanges.I.min, tierRanges.I.max); }

    ['I', 'II', 'III', 'IV', 'V'].forEach((tier: ItemTier) => {
      const feature = `${statToPotion[stat]} Potions ${tier}`;
      if (feature === 'Health Potions I') { return; }
      if (!doesTownHaveFeature(town, feature)) { return; }

      value = random(tierRanges[tier].min, tierRanges[tier].max) + town.buildings[Building.Alchemist].level;
      itemTier = tier;
    });

    return { stat, value };
  });

  // give it a name
  let name = `${statToPotion[chosenStatCombo[0]]} Potion ${itemTier}`;
  if (chosenStatCombo.length === 2) { name = `Two-color Potion ${itemTier}`; }
  if (chosenStatCombo.length === 3) { name = `Three-color Potion ${itemTier}`; }

  const item = {
    name,
    uuid: uuid(),
    type: ItemType.Potion,
    sprite: pickPotionSprite(chosenStatCombo, itemTier),
    boostStats,
    cost: calculateItemCost(boostStats)
  };

  return item;
}

export function generateArmor(town: IGameTown): HeroItem {
  return {
    name: 'Default Armor',
    uuid: uuid(),
    type: ItemType.Armor,
    sprite: 0,
    boostStats: [],
    cost: 1n
  };
}

export function generateWeapon(town: IGameTown): HeroItem {
  return {
    name: 'Default Weapon',
    uuid: uuid(),
    type: ItemType.Weapon,
    sprite: 0,
    boostStats: [],
    cost: 1n
  };
}

export function generateItem(town: IGameTown, itemType: ItemType): HeroItem {
  switch (itemType) {
    case ItemType.Potion: return generatePotion(town);
    case ItemType.Armor:  return generateArmor(town);
    case ItemType.Weapon: return generateWeapon(town);
  }
}
