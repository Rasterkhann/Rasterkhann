
import { Building, IGameTown, IGameState } from '../interfaces';
import { calculateOfflineGold } from './town';

export function beforeSerialize(obj) {

  obj = { ...obj };

  if (!obj.version) { obj.version = 1; }

  // if there's a gamestate, serialize the bigints and do another bunch of immutable-juggling
  if (obj.towns) {
    obj.towns = { ...obj.towns };

    Object.keys(obj.towns).forEach(townName => {
      const town = { ...obj.towns[townName] };
      town.gold = town.gold.toString();
      town.goldPerTick = town.goldPerTick.toString();

      obj.towns[townName] = town;
    });
  }

  return obj;
}

export function afterDeserialize(obj) {

  try {
    // if there's a gamestate, deserialize the bigints
    if (obj.towns) {
      Object.keys(obj.towns).forEach(townName => {
        const town = obj.towns[townName];
        town.gold = BigInt(town.gold);
        town.goldPerTick = BigInt(town.goldPerTick);
      });
    }

    if (obj.lastTimestamp) {
      const bonusGold = calculateOfflineGold(obj);
      obj.towns[obj.currentTown].gold += bonusGold;
    }

  } catch (e) {
    alert(`Your savefile could not be loaded correctly, the error is: ${e}`);
  }

  return obj;
}

export function createBasicTown(): Partial<IGameTown> {
  return {
    gold: 0n,
    goldPerTick: 0n,

    buildings: {
      [Building.TownHall]: {
        level: 1
      },

      [Building.Watchtower]: {
        level: 1
      },

      [Building.House]: {
        level: 3
      }
    }
  };
}

export function createDefaultSavefile(): IGameState {
  return {
    lastTimestamp: 0,
    currentInfo: Building.TownHall,
    currentTown: 'Rasterkhann',
    towns: {
      Rasterkhann: createBasicTown() as IGameTown
    },
    options: {}
  };
}
