
import { Building, IGameTown, IGameState, BuildingInfo, ProspectiveHero, ItemType, HeroItem, GameOption } from '../interfaces';
import { calculateOfflineAdventureProgress, calculateOfflineGold } from './town';

export function beforeSerialize(obj: any): IGameState {

  obj = { ...obj };

  if (!obj.version) { obj.version = 1; }

  // if there's a gamestate, serialize the bigints and do another bunch of immutable-juggling
  if (obj.towns) {
    obj.towns = { ...obj.towns };

    Object.keys(obj.towns).forEach(townName => {
      const town = { ...obj.towns[townName] };
      town.gold = town.gold.toString();
      town.goldPerTick = town.goldPerTick.toString();

      town.prospectiveHeroes = town.prospectiveHeroes.map((hero: ProspectiveHero) => ({ ...hero, cost: hero.cost.toString() }));

      town.itemsForSale = { ...town.itemsForSale };
      Object.keys(town.itemsForSale).forEach(itemType => {
        town.itemsForSale[itemType] = town.itemsForSale[itemType].map((item: HeroItem) => ({ ...item, cost: item.cost.toString() }));
      });

      obj.towns[townName] = town;
    });
  }

  return obj;
}

export function afterDeserialize(obj: IGameState): IGameState {

  try {
    // if there's a gamestate, deserialize the bigints
    if (obj.towns) {
      Object.keys(obj.towns).forEach(townName => {
        const town = obj.towns[townName];
        town.gold = BigInt(town.gold);
        town.goldPerTick = BigInt(town.goldPerTick);

        town.prospectiveHeroes.forEach(hero => hero.cost = BigInt(hero.cost));

        Object.keys(town.itemsForSale).forEach((itemType: ItemType) => {
          town.itemsForSale[itemType].forEach(item => item.cost = BigInt(item.cost));
        });
      });
    }

    if (obj.lastTimestamp) {
      const bonusGold = calculateOfflineGold(obj);
      obj.towns[obj.currentTown].gold += bonusGold;

      calculateOfflineAdventureProgress(obj);
    }

  } catch (e) {
    alert(`Your savefile could not be loaded correctly, the error is: ${e}`);
  }

  return obj;
}

export function createBuildingAtLevel(level: number): BuildingInfo {
  return { level, features: {}, featureConstruction: {} };
}

export function createBasicTown(name: string): IGameTown {
  return {
    name,
    gold: 0n,
    goldPerTick: 0n,

    recruitedHeroes: [],
    prospectiveHeroes: [],

    activeAdventures: [],
    potentialAdventures: [],

    recentNews: [],
    itemsForSale: {
      [ItemType.Armor]: [],
      [ItemType.Weapon]: [],
      [ItemType.Potion]: [],
    },
    nextItemCreation: {
      [ItemType.Armor]: 0,
      [ItemType.Weapon]: 0,
      [ItemType.Potion]: 0
    },

    buildings: {
      [Building.TownHall]: createBuildingAtLevel(1),
      [Building.Watchtower]: createBuildingAtLevel(1),
      [Building.House]: createBuildingAtLevel(3),
      [Building.Alchemist]: createBuildingAtLevel(0),
      [Building.Armory]: createBuildingAtLevel(0),
      [Building.Bazaar]: createBuildingAtLevel(0),
      [Building.Cave]: createBuildingAtLevel(0),
      [Building.GuildHall]: createBuildingAtLevel(0),
      [Building.Inn]: createBuildingAtLevel(0),
      [Building.Workshop]: createBuildingAtLevel(0),
      [Building.Archives]: createBuildingAtLevel(0),
      [Building.Library]: createBuildingAtLevel(0)
    }
  };
}

export function createDefaultSavefile(): IGameState {
  return {
    version: 1,
    lastTimestamp: 0,
    currentInfo: Building.TownHall,
    currentTown: 'Rasterkhann',
    towns: {
      Rasterkhann: createBasicTown('Rasterkhann') as IGameTown
    },
    options: {
      [GameOption.ShowHelpText]: true
    }
  };
}
