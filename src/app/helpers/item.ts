

import { HeroItem, IGameTown, ItemType, Building, Hero } from '../interfaces';
import { doesTownHaveFeature } from './global';
import { generateArmor } from './armor';
import { generatePotion } from './potion';
import { generateWeapon } from './weapon';

const buildingsRequiredPerItemType = {
  [ItemType.Potion]: Building.Alchemist,
  [ItemType.Weapon]: Building.Armory,
  [ItemType.Armor]:  Building.Armory
};

// calculator helper functions
export function calculateMaxCreatableItems(town: IGameTown, itemType: ItemType): number {
  let base = 0;

  if (town.buildings[buildingsRequiredPerItemType[itemType]].level > 0) { base += 3; }
  if (doesTownHaveFeature(town, `More ${itemType}s I`))                 { base += 2; }
  if (doesTownHaveFeature(town, `More ${itemType}s II`))                { base += 2; }
  if (doesTownHaveFeature(town, `More ${itemType}s III`))               { base += 2; }

  return base;
}

export function calculateSecondsUntilNextItem(town: IGameTown, itemType: ItemType): number {
  let base = 0;

  if (town.buildings[buildingsRequiredPerItemType[itemType]].level > 0)       { base += 900; }
  if (doesTownHaveFeature(town, `Faster ${itemType} Creation I`))             { base -= 150; }
  if (doesTownHaveFeature(town, `Faster ${itemType} Creation II`))            { base -= 150; }
  if (doesTownHaveFeature(town, `Faster ${itemType} Creation III`))           { base -= 150; }
  if (town.buildings[buildingsRequiredPerItemType[itemType]].currentWorkerId) { base /= 2; }

  return Math.floor(base);
}

export function generateItem(town: IGameTown, itemType: ItemType): HeroItem {
  switch (itemType) {
    case ItemType.Potion: return generatePotion(town);
    case ItemType.Armor:  return generateArmor(town);
    case ItemType.Weapon: return generateWeapon(town);
  }
}
