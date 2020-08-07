
import { random, sample } from 'lodash';
import { v4 as uuid } from 'uuid';

import { HeroItem, GameTown, HeroStat, ItemTier, ItemType, Building } from '../interfaces';
import { calculateItemCost, doesTownHaveFeature, numAllocatedToBuilding } from './global';


// potion functions
function pickPotionSprite(statsModified: HeroStat[], tier: ItemTier): number {

  const getTierSprite = (col: number) => {

    // get the row for each tier
    const tierSprites: Record<ItemTier, number> = {
      I: 14,
      II: 15,
      III: 5,
      IV: 2,
      V: 4
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
  if (!hasHP && hasSP && hasSTA)  { return getTierSprite(5); }

  // tri-ingredient potions
  if (hasHP && hasSP && hasSTA)   { return getTierSprite(6); }

  // first broken bottle sprite
  return 13;
}

export function generatePotion(town: GameTown): HeroItem {

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
    I:   { min: 5,    max: 15 },
    II:  { min: 10,   max: 45 },
    III: { min: 25,   max: 100 },
    IV:  { min: 50,   max: 175 },
    V:   { min: 100,  max: 300 },
  };

  // get the name for the stat
  const statToPotion: Partial<Record<HeroStat, string>> = {
    [HeroStat.HP]:  'Health',
    [HeroStat.SP]:  'Skill',
    [HeroStat.STA]: 'Stamina'
  };

  let itemTier: ItemTier = 'I';

  const boostStats = chosenStatCombo.map((stat: HeroStat) => {
    let value = 0;

    // there is no "Healing Potions I" so it gets a default value
    if (stat === HeroStat.HP) { value = random(tierRanges.I.min, tierRanges.I.max); }

    const validTiers = ['I', 'II', 'III', 'IV', 'V'].filter(checkTier => doesTownHaveFeature(town, `${statToPotion[stat]} Potions ${checkTier}`));
    const tier = (sample(validTiers) || 'I') as ItemTier;
    value = random(tierRanges[tier].min, tierRanges[tier].max) + random(1, town.buildings[Building.Alchemist].level);
    itemTier = tier;

    return { stat, value };
  });

  // boost with workers
  const totalWorkers = numAllocatedToBuilding(town, Building.Alchemist);
  for (let i = 0; i < totalWorkers; i++) {
    const stat = sample(boostStats);
    if (!stat) { continue; }

    stat.value += 1;
  }

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
    cost: calculateItemCost(town, boostStats, 2n),
    timesPassedOver: 0,
    curDurability: 1,
    maxDurability: 1
  };

  return item;
}
