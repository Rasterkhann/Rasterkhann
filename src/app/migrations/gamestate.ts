import { IGameState } from '../interfaces';

export const migrations = [
  {
    version: 1,
    key: 'gamestate',
    versionKey: 'version',
    migrate: (state: IGameState) => {
      // state.version = 2;
      /*
      state.towns.Rasterkhann.recruitedHeroes.forEach(h => {
        h.currentStats.hp = h.stats.hp;
        h.currentStats.sta = h.stats.sta;
      });
      */
      return state;
    }
  }
];
