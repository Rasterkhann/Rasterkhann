import { IGameState, ItemType } from '../interfaces';
import { createBuildingAtLevel } from '../helpers';

export const migrations = [
  {
    version: 1,
    key: 'gamestate',
    versionKey: 'version',
    migrate: (state: IGameState) => {
      // state.version = 2;
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

      state.version = 2;

      return state;
    }
  },
  {
    version: 2,
    key: 'gamestate',
    versionKey: 'version',
    migrate: (state: IGameState) => {
      console.log('Savefile version 2...');
      return state;
    }
  }
];
