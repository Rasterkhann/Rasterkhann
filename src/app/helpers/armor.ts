

import { random, sample } from 'lodash';
import { v4 as uuid } from 'uuid';

import { HeroItem, IGameTown, HeroStat, ItemTier, ItemType, Building } from '../interfaces';
import { calculateItemCost, doesTownHaveFeature } from './global';

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
