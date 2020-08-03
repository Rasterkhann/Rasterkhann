import { Building, IGameState, ItemType, TownStat, HeroJob, Version } from '../interfaces';
import { createBuildingAtLevel, createStatBlock, getZeroStatBlock } from '../helpers';

export const migrations = [
  {
    version: Version.First,
    key: 'gamestate',
    versionKey: 'version',
    migrate: (state: IGameState) => {
      console.log('Savefile version 1...');

      console.log('Running migrations...');

      console.log('Validating RecentNews...');
      state.towns.Rasterkhann.recentNews = state.towns.Rasterkhann.recentNews || [];

      console.log('Validating Archives/Library...');
      state.towns.Rasterkhann.buildings.archives = state.towns.Rasterkhann.buildings.archives || createBuildingAtLevel(0);
      state.towns.Rasterkhann.buildings.library = state.towns.Rasterkhann.buildings.library || createBuildingAtLevel(0);

      console.log('Setting up Health Potions I...');
      state.towns.Rasterkhann.buildings.alchemist.features['Health Potions I'] = 1;

      console.log('Validating ItemsForSale/NextItemCreation...');
      if (!state.towns.Rasterkhann.itemsForSale) {
        state.towns.Rasterkhann.itemsForSale = {
          Armor: [],
          Weapon: [],
          Potion: [],
        };
      }

      if (!state.towns.Rasterkhann.nextItemCreation) {
        state.towns.Rasterkhann.nextItemCreation = {
          Armor: 0,
          Weapon: 0,
          Potion: 0,
        };
      }

      console.log('Cleaning ItemsForSale/NextItemCreation...');
      Object.keys(ItemType).forEach((itemType: ItemType) => {
        state.towns.Rasterkhann.itemsForSale[itemType] = state.towns.Rasterkhann.itemsForSale[itemType] || [];
        state.towns.Rasterkhann.nextItemCreation[itemType] = state.towns.Rasterkhann.nextItemCreation[itemType] || 0;
      });

      console.log('Setting TownName...');
      Object.keys(state.towns).forEach(townName => {
        if (state.towns[townName].name) { return; }
        state.towns[townName].name = townName;
      });

      console.log('Validating Heroes...');
      state.towns.Rasterkhann.recruitedHeroes.forEach(h => {
        h.gear = h.gear || { Potion: [], Weapon: [], Armor: [] };
        h.gear.Potion = h.gear.Potion || [];
        h.gear.Weapon = h.gear.Weapon || [];
        h.gear.Armor = h.gear.Armor || [];
        if (h.onAdventure && !state.towns.Rasterkhann.activeAdventures.map(a => a.uuid).includes(h.onAdventure)) {
          h.onAdventure = '';
        }
      });

      console.log('Adding combat log support...');
      state.towns.Rasterkhann.combatLogs = state.towns.Rasterkhann.combatLogs || [];

      state.version = Version.TrackedStats;

      return state;
    }
  },
  {
    version: Version.TrackedStats,
    key: 'gamestate',
    versionKey: 'version',
    migrate: (state: IGameState) => {
      console.log('Savefile version 2...');

      console.log('Migrating heroes to have stats...');
      state.towns.Rasterkhann.recruitedHeroes.forEach(h => {
        h.trackedStats = h.trackedStats || {};
      });

      state.towns.Rasterkhann.prospectiveHeroes.forEach(ph => {
        ph.hero.trackedStats = ph.hero.trackedStats || {};
      });

      state.version = Version.Durability;

      return state;
    }
  },
  {
    version: Version.Durability,
    key: 'gamestate',
    versionKey: 'version',
    migrate: (state: IGameState) => {
      console.log('Savefile version 3...');

      console.log('Setting armor/weapon durability to 100/100...');
      state.towns.Rasterkhann.recruitedHeroes.forEach(h => {
        h.gear.Armor.forEach(a => {
          if (!a.curDurability) { a.curDurability = 100; }
          if (!a.maxDurability) { a.maxDurability = 100; }
        });
        h.gear.Weapon.forEach(w => {
          if (!w.curDurability) { w.curDurability = 100; }
          if (!w.maxDurability) { w.maxDurability = 100; }
        });
      });

      state.version = Version.CleanRefs;
      return state;
    }
  },
  {
    version: Version.CleanRefs,
    key: 'gamestate',
    versionKey: 'version',
    migrate: (state: IGameState) => {
      console.log('Savefile version 4...');

      console.log('Fixing buildings with stale worker refs...');
      Object.values(state.towns.Rasterkhann.buildings).forEach(b => {
        if (!b.currentWorkerId) { return; }

        const heroRef = state.towns.Rasterkhann.recruitedHeroes.find(h => h.uuid === b.currentWorkerId);
        if (!heroRef) {
          b.currentWorkerId = null;
        }
      });

      state.version = Version.HeroRetire;

      return state;
    }
  },
  {
    version: Version.HeroRetire,
    key: 'gamestate',
    versionKey: 'version',
    migrate: (state: IGameState) => {
      console.log('Savefile version 5...');

      console.log('Setting heroes default location to the inn...');
      state.towns.Rasterkhann.recruitedHeroes.forEach(h => {
        h.currentlyAtBuilding = h.currentlyAtBuilding || Building.Inn;
      });

      console.log('Setting default town stats records...');
      state.towns.Rasterkhann.stats = state.towns.Rasterkhann.stats || {
        [TownStat.Adventures]:    createStatBlock(),
        [TownStat.Encounters]:    createStatBlock(),
        [TownStat.Gold]:          createStatBlock(),
        [TownStat.Levels]:        createStatBlock(),
        [TownStat.Retires]:       createStatBlock(),
        [TownStat.CrystalsSpent]: createStatBlock()
      };

      console.log('Setting stage 2 UI if available...');
      if (Object.values(state.towns.Rasterkhann.stats.retires).some(Boolean)) {
        state.towns.Rasterkhann.showStage2UI = true;
      }

      console.log('Setting new town stat...');
      state.towns.Rasterkhann.stats.crystals = state.towns.Rasterkhann.stats.crystals || createStatBlock();

      console.log('Setting crystal currency...');
      state.towns.Rasterkhann.crystalCurrency = state.towns.Rasterkhann.crystalCurrency || {};

      console.log('Resetting crystal currency...');
      Object.keys(state.towns.Rasterkhann.stats.retires).forEach((job: HeroJob) => {
        state.towns.Rasterkhann.crystalCurrency[job] = Number(state.towns.Rasterkhann.stats.retires[job]);
      });

      console.log('Fixing buildings with stale worker refs (again)...');
      Object.values(state.towns.Rasterkhann.buildings).forEach(b => {
        if (!b.currentWorkerId) { return; }

        const heroRef = state.towns.Rasterkhann.recruitedHeroes.find(h => h.uuid === b.currentWorkerId);
        if (!heroRef) {
          b.currentWorkerId = null;
        }
      });

      console.log('Creating crystal buffs blob...');
      state.towns.Rasterkhann.crystalBuffs = state.towns.Rasterkhann.crystalBuffs || getZeroStatBlock();

      return state;
    }
  }
];
