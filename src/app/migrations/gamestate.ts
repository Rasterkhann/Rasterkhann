import { IGameState, ItemType } from '../interfaces';
import { createBuildingAtLevel } from '../helpers';

export const migrations = [
  {
    version: 1,
    key: 'gamestate',
    versionKey: 'version',
    migrate: (state: IGameState) => {
      // state.version = 2;

      state.towns.Rasterkhann.recentNews = state.towns.Rasterkhann.recentNews || [];

      state.towns.Rasterkhann.buildings.archives = state.towns.Rasterkhann.buildings.archives || createBuildingAtLevel(0);
      state.towns.Rasterkhann.buildings.library = state.towns.Rasterkhann.buildings.library || createBuildingAtLevel(0);

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

      Object.keys(ItemType).forEach((itemType: ItemType) => {
        state.towns.Rasterkhann.itemsForSale[itemType] = state.towns.Rasterkhann.itemsForSale[itemType] || [];
        state.towns.Rasterkhann.nextItemCreation[itemType] = state.towns.Rasterkhann.nextItemCreation[itemType] || 0;
      });

      Object.keys(state.towns).forEach(townName => {
        if (state.towns[townName].name) { return; }
        state.towns[townName].name = townName;
      });

      state.towns.Rasterkhann.recruitedHeroes.forEach(h => {
        if (h.onAdventure && !state.towns.Rasterkhann.activeAdventures.map(a => a.uuid).includes(h.onAdventure)) {
          h.onAdventure = '';
        }
      });
      return state;
    }
  }
];
