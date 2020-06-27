
export const migrations = [
  {
    version: 1,
    key: 'gamestate',
    versionKey: 'version',
    migrate: state => {
      if (!state.towns.Rasterkhann.buildings.watchtower) {
        state.towns.Rasterkhann.buildings.watchtower = { level: 1 };
      }
      // state.version = 2;
      return state;
    }
  }
];
