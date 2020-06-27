
export const migrations = [
  {
    version: 1,
    key: 'gamestate',
    versionKey: 'version',
    migrate: state => {
      // state.version = 2;
      return state;
    }
  }
];
