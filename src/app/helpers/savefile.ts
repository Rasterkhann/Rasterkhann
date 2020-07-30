
import { Building, GameTown, IGameState, BuildingInfo,
  ProspectiveHero, ItemType, HeroItem, GameOption, Hero, TownStat, HeroJob } from '../interfaces';
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

      town.recruitedHeroes = [...town.recruitedHeroes];

      town.recruitedHeroes.forEach((hero: Hero, i: number) => {
        town.recruitedHeroes[i] = { ...hero };

        hero = town.recruitedHeroes[i];
        hero.gear = { ...hero.gear };

        Object.keys(hero.gear).forEach((gearSlot: ItemType) => {
          (hero.gear[gearSlot] as any[]) = (hero.gear[gearSlot] as HeroItem[])
            .map((item: HeroItem) => ({ ...item, cost: (item.cost || 0).toString() }));
        });
      });

      town.stats = { ...town.stats };
      Object.keys(town.stats).forEach(majorKey => {
        town.stats[majorKey] = { ...town.stats[majorKey] };
        Object.keys(town.stats[majorKey]).forEach(minorKey => {
          town.stats[majorKey][minorKey] = town.stats[majorKey][minorKey].toString();
        });
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

        town.recruitedHeroes.forEach((hero: Hero) => {
          Object.keys(hero.gear).forEach((gearSlot: ItemType) => {
            hero.gear[gearSlot].forEach((i: HeroItem) => {
              i.cost = BigInt(i.cost || 0);
            });
          });
        });

        Object.keys(town.stats || {}).forEach((majorKey: TownStat) => {
          Object.keys(town.stats[majorKey] || {}).forEach((minorKey: HeroJob) => {
            town.stats[majorKey][minorKey] = BigInt(town.stats[majorKey][minorKey]);
          });
        });
      });
    }

    if (obj.lastTimestamp) {
      const bonusGold = calculateOfflineGold(obj);
      obj.towns[obj.currentTown].gold += bonusGold;

      try {
        calculateOfflineAdventureProgress(obj);
      } catch (e) {
        console.error('Could not do adventure catch-up. Skipping...');
      }
    }

  } catch (e) {
    alert(`Your savefile could not be loaded correctly, the error is: ${e}`);
  }

  return obj;
}

export function createBuildingAtLevel(level: number, features = {}): BuildingInfo {
  return { level, features, featureConstruction: {}, currentWorkerId: '', numRetiredAllocated: 0 };
}

export function createStatBlock(): Record<HeroJob, bigint> {
  return {
    [HeroJob.Adventurer]: 0n,
    [HeroJob.Mage]: 0n,
    [HeroJob.Thief]: 0n,
    [HeroJob.Cleric]: 0n,
    [HeroJob.Warrior]: 0n
  };
}

export function createBasicTown(name: string): GameTown {
  return {
    name,
    gold: 0n,
    goldPerTick: 0n,

    recruitedHeroes: [],
    prospectiveHeroes: [],

    activeAdventures: [],
    potentialAdventures: [],

    recentNews: [],
    combatLogs: [],

    itemsForSale: {
      [ItemType.Armor]:  [],
      [ItemType.Weapon]: [],
      [ItemType.Potion]: [],
    },
    nextItemCreation: {
      [ItemType.Armor]:  0,
      [ItemType.Weapon]: 0,
      [ItemType.Potion]: 0
    },

    buildings: {
      [Building.TownHall]:      createBuildingAtLevel(1),
      [Building.Watchtower]:    createBuildingAtLevel(1),
      [Building.House]:         createBuildingAtLevel(3),
      [Building.Alchemist]:     createBuildingAtLevel(0, { 'Health Potions I': 1 }),
      [Building.Armory]:        createBuildingAtLevel(0),
      [Building.Bazaar]:        createBuildingAtLevel(0),
      [Building.Cave]:          createBuildingAtLevel(0),
      [Building.GuildHall]:     createBuildingAtLevel(0),
      [Building.Inn]:           createBuildingAtLevel(0),
      [Building.Workshop]:      createBuildingAtLevel(0),
      [Building.Archives]:      createBuildingAtLevel(0),
      [Building.Library]:       createBuildingAtLevel(0)
    },

    stats: {
      [TownStat.Adventures]:    createStatBlock(),
      [TownStat.Encounters]:    createStatBlock(),
      [TownStat.Gold]:          createStatBlock(),
      [TownStat.Levels]:        createStatBlock(),
      [TownStat.Retires]:       createStatBlock()
    },

    crystalCurrency: {
      [HeroJob.Adventurer]:     0,
      [HeroJob.Cleric]:         0,
      [HeroJob.Mage]:           0,
      [HeroJob.Thief]:          0,
      [HeroJob.Warrior]:        0
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
      Rasterkhann: createBasicTown('Rasterkhann') as GameTown
    },
    options: {
      [GameOption.ShowHelpText]: true
    }
  };
}
