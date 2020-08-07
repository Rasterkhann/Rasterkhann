

import { random, sample } from 'lodash';
import { v4 as uuid } from 'uuid';

import { GameTown, HeroStat, ItemType, WeaponSubType, WeaponElement, HeroWeapon, HeroAction, Building } from '../interfaces';
import { ElementActions, SubTypeActions } from '../static';
import { calculateItemCost, calculateItemDurability, doesTownHaveFeature, numAllocatedToBuilding } from './global';
import { getZeroStatBlock } from './hero';
import { chooseRandomItemTrait } from './itemtraits';
import { WEAPON_BASIC_SPRITE_INFO_TYPE, WEAPON_BASIC_SPRITE_INFO_WEAPON, WEAPON_TYPE_BASE_STATS, WEAPON_ELEMENT_BASE_STATS } from '../static/weapon-presets';

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

  let cost = calculateItemCost(town, boostStats, 1n) / 2n;
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
