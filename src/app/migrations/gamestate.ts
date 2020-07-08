import { IGameState } from '../interfaces';

export const migrations = [
  {
    version: 1,
    key: 'gamestate',
    versionKey: 'version',
    migrate: (state: IGameState) => {
      // state.version = 2;
      state.towns.Rasterkhann.recruitedHeroes.forEach(h => {
        if(h.onAdventure && state.towns.Rasterkhann.activeAdventures.length === 0) {
          h.onAdventure = '';
        }
      });
      return state;
    }
  }
];
