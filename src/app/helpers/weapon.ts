

import { random, sample } from 'lodash';
import { v4 as uuid } from 'uuid';

import { GameTown, HeroStat, ItemType, WeaponSubType, WeaponElement, HeroWeapon, HeroAction, Building } from '../interfaces';
import { ElementActions, SubTypeActions } from '../static';
import { calculateItemCost, calculateItemDurability, doesTownHaveFeature, numAllocatedToBuilding } from './global';
import { getZeroStatBlock } from './hero';
import { chooseRandomItemTrait } from './itemtraits';

const WEAPON_BASIC_SPRITE_INFO_TYPE: Record<WeaponElement, number> = {
  [WeaponElement.Iron]: 0,
  [WeaponElement.Fire]: 1,
  [WeaponElement.Ice]: 2,
  [WeaponElement.Wind]: 3,
  [WeaponElement.Earth]: 4,
  [WeaponElement.Lightning]: 5,
  [WeaponElement.Shadetin]: 6,
  [WeaponElement.Darksteel]: 7,
  [WeaponElement.Brightgold]: 8,
  [WeaponElement.Obsidiron]: 9,
  [WeaponElement.Melfrost]: 10
};

const WEAPON_BASIC_SPRITE_INFO_WEAPON: Record<WeaponSubType, number> = {
  [WeaponSubType.Sword]: 0,
  [WeaponSubType.Knife]: 1,
  [WeaponSubType.Katar]: 2,
  [WeaponSubType.Hatchet]: 3,
  [WeaponSubType.Spear]: 4,
  [WeaponSubType.Mace]: 5,
  [WeaponSubType.Staff]: 6,
  [WeaponSubType.Shuriken]: 7,
  [WeaponSubType.Wand]: 8,
  [WeaponSubType.Arrow]: 9,
  [WeaponSubType.Shortbow]: 10,
  [WeaponSubType.Longbow]: 11
};

const WEAPON_TYPE_BASE_STATS: Record<WeaponSubType, Partial<Record<HeroStat, number>>> = {
  [WeaponSubType.Sword]:    { [HeroStat.ATK]: 5 },
  [WeaponSubType.Knife]:    { [HeroStat.ATK]: 3, [HeroStat.STA]: 2 },
  [WeaponSubType.Katar]:    { [HeroStat.ATK]: 4, [HeroStat.DEF]: 2 },
  [WeaponSubType.Hatchet]:  { [HeroStat.ATK]: 4, [HeroStat.HP]: 2 },
  [WeaponSubType.Spear]:    { [HeroStat.ATK]: 2, [HeroStat.DEF]: 4 },
  [WeaponSubType.Mace]:     { [HeroStat.ATK]: 1, [HeroStat.DEF]: 4, [HeroStat.STA]: 2 },
  [WeaponSubType.Staff]:    { [HeroStat.DEF]: 3, [HeroStat.STA]: 2, [HeroStat.SP]: 4 },
  [WeaponSubType.Shuriken]: { [HeroStat.ATK]: 1, [HeroStat.STA]: 5 },
  [WeaponSubType.Wand]:     { [HeroStat.ATK]: 3, [HeroStat.DEF]: 4, [HeroStat.SP]: 3 },
  [WeaponSubType.Arrow]:    {},
  [WeaponSubType.Shortbow]: { [HeroStat.ATK]: 3, [HeroStat.SP]: 2,  [HeroStat.STA]: 2 },
  [WeaponSubType.Longbow]:  { [HeroStat.ATK]: 4, [HeroStat.DEF]: 2, [HeroStat.STA]: 1 }
};

const WEAPON_ELEMENT_BASE_STATS: Record<WeaponElement, Partial<Record<HeroStat, number>>> = {
  [WeaponElement.Iron]:       { [HeroStat.ATK]: 3 },

  [WeaponElement.Fire]:       { [HeroStat.SP]: 10, [HeroStat.ATK]: 5 },
  [WeaponElement.Ice]:        { [HeroStat.SP]: 10, [HeroStat.DEF]: 5 },
  [WeaponElement.Wind]:       { [HeroStat.SP]: 10, [HeroStat.HP]:  20 },
  [WeaponElement.Earth]:      { [HeroStat.SP]: 10, [HeroStat.DEF]: 5 },
  [WeaponElement.Lightning]:  { [HeroStat.SP]: 10, [HeroStat.STA]: 5 },

  [WeaponElement.Shadetin]:   { [HeroStat.ATK]: 5, [HeroStat.DEF]: 4 },
  [WeaponElement.Darksteel]:  { [HeroStat.ATK]: 5, [HeroStat.STA]: 3 },
  [WeaponElement.Brightgold]: { [HeroStat.ATK]: 2, [HeroStat.DEF]: 2, [HeroStat.SP]: 4 },
  [WeaponElement.Obsidiron]:  { [HeroStat.DEF]: 5, [HeroStat.STA]: 3 },
  [WeaponElement.Melfrost]:   { [HeroStat.ATK]: 5, [HeroStat.SP]: 10 }
};

function getValidSubtypesForGeneration(town: GameTown): WeaponSubType[] {
  const validTypes = [WeaponSubType.Sword, WeaponSubType.Knife, WeaponSubType.Hatchet];

  if (doesTownHaveFeature(town, 'Martial Weapons')) { validTypes.push(WeaponSubType.Spear, WeaponSubType.Mace); }
  if (doesTownHaveFeature(town, 'Ranged Weapons')) { validTypes.push(WeaponSubType.Longbow, WeaponSubType.Shortbow); }
  if (doesTownHaveFeature(town, 'Small Weapons')) { validTypes.push(WeaponSubType.Katar, WeaponSubType.Shuriken); }
  if (doesTownHaveFeature(town, 'Magical Weapons')) { validTypes.push(WeaponSubType.Staff, WeaponSubType.Wand); }

  return validTypes;
}

function getValidElementsForGeneration(town: GameTown): WeaponElement[] {
  const validElements = [WeaponElement.Iron];

  [
    WeaponElement.Shadetin, WeaponElement.Darksteel,
    WeaponElement.Brightgold, WeaponElement.Obsidiron,
    WeaponElement.Melfrost,

    WeaponElement.Fire, WeaponElement.Ice,
    WeaponElement.Wind, WeaponElement.Earth,
    WeaponElement.Lightning
  ].forEach(element => {
    if (!doesTownHaveFeature(town, `${element} Weapons`)) { return; }
    validElements.push(element);
  });

  return validElements;
}

function getSpriteForWeapon(subType: WeaponSubType, element: WeaponElement): number {
  const width = 16;
  return (WEAPON_BASIC_SPRITE_INFO_WEAPON[subType] * width) + WEAPON_BASIC_SPRITE_INFO_TYPE[element];
}

export function generateWeapon(town: GameTown): HeroWeapon {

  const trait = chooseRandomItemTrait(town);
  const subType = sample(getValidSubtypesForGeneration(town)) as WeaponSubType;
  const element = sample(getValidElementsForGeneration(town)) as WeaponElement;

  const boostStatHash: Record<HeroStat, number> = getZeroStatBlock();
  Object.keys(WEAPON_TYPE_BASE_STATS[subType]).forEach((stat: HeroStat) => {
    boostStatHash[stat] = boostStatHash[stat] || 0;
    boostStatHash[stat] += WEAPON_TYPE_BASE_STATS[subType][stat] || 0;
  });

  Object.keys(WEAPON_ELEMENT_BASE_STATS[element]).forEach((stat: HeroStat) => {
    boostStatHash[stat] = boostStatHash[stat] || 0;
    boostStatHash[stat] += WEAPON_ELEMENT_BASE_STATS[element][stat] || 0;
  });

  if (trait) {
    Object.keys(trait.stats).forEach((stat: HeroStat) => {
      boostStatHash[stat] = boostStatHash[stat] || 0;
      boostStatHash[stat] += trait.stats[stat] || 0;
    });
  }

  const boostStats = Object.keys(boostStatHash)
    .map((stat: HeroStat) => ({ stat, value: boostStatHash[stat] }))
    .filter(({ value }) => value !== 0)
    .map(obj => ({ ...obj, value: obj.value + random(1, town.buildings[Building.Armory].level) }));

  // boost with workers
  const totalWorkers = numAllocatedToBuilding(town, Building.Armory);
  for (let i = 0; i < totalWorkers; i++) {
    const stat = sample([HeroStat.ATK, HeroStat.DEF, HeroStat.HP, HeroStat.SP, HeroStat.STA]);
    if (!stat) { continue; }

    let boostStatRef = boostStats.find(s => s.stat === stat);
    if (!boostStatRef) {
      boostStatRef = { stat, value: 0 };
      boostStats.push(boostStatRef);
    }

    boostStatRef.value += 1;
  }

  let cost = calculateItemCost(town, boostStats) * 10n;
  if (cost < 0n) { cost = 1000n; }

  let durability = calculateItemDurability(town, boostStats);
  if (durability < 100) { durability = 100; }

  if (element === WeaponElement.Darksteel) { durability = Math.floor(durability * 1.25); }
  if (element === WeaponElement.Earth) { durability *= 2; }

  return {
    name: `${trait ? trait.name + ' ' : ''}${element} ${subType}`,
    subType,
    element,
    uuid: uuid(),
    type: ItemType.Weapon,
    sprite: getSpriteForWeapon(subType, element),
    boostStats,
    cost,
    timesPassedOver: 0,
    curDurability: durability,
    maxDurability: durability
  };
}

export function getActionsForWeapon(weapon: HeroWeapon): HeroAction[] {
  const typeActions = SubTypeActions[weapon.subType];
  const elementActions = ElementActions[weapon.element];
  return typeActions.concat(elementActions);
}
