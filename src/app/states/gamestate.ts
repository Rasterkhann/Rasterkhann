
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';

import { GainCurrentGold, GainGold, SpendGold, ChooseInfo, GameLoop, UpgradeBuilding, LoadSaveData, OptionToggleUpgradeVisibility, UpgradeBuildingFeature } from '../actions';
import { IGameTown, IGameState, Building, BuildingData, GameOption } from '../interfaces';

function calculateOfflineGold(state): bigint {
  const goldGainPerTick = GameState.currentTownGoldGain(state);
  const now = Date.now();
  const prev = state.lastTimestamp;

  const diffSeconds = ((now - prev) / 1000);
  return goldGainPerTick * BigInt(Math.floor(diffSeconds));
}

function getCurrentTownFromState(state: IGameState): IGameTown {
  return { name: state.currentTown, ...state.towns[state.currentTown] };
}

function calculateGoldGain(state: IGameState): bigint {
  const town = getCurrentTownFromState(state);
  return BigInt(town.buildings.house.level) + town.goldPerTick;
}

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

@State<IGameState>({
  name: 'gamestate',
  defaults: createDefaultSavefile()
})
@Injectable()
export class GameState {

  @Selector()
  @ImmutableSelector()
  public static entireSavefile(state: IGameState): IGameState {
    return state;
  }

  @Selector()
  @ImmutableSelector()
  public static currentTown(state: IGameState): IGameTown {
    return getCurrentTownFromState(state);
  }

  @Selector()
  @ImmutableSelector()
  public static currentTownGoldGain(state: IGameState): bigint {
    return calculateGoldGain(state);
  }

  @Selector()
  @ImmutableSelector()
  public static currentInfoWindow(state: IGameState): string {
    return state.currentInfo;
  }

  constructor(private store: Store) {}

  // misc functions
  @Action(GameLoop)
  @ImmutableContext()
  updateTimestamp({ setState }: StateContext<IGameState>) {
    setState((state: IGameState) => {
      state.lastTimestamp = Date.now();
      return state;
    });
  }

  @Action(LoadSaveData)
  @ImmutableContext()
  loadSaveData({ setState }: StateContext<IGameState>, { gamestate }: LoadSaveData) {
    setState(() => {
      return gamestate;
    });
  }

  // gold functions
  @Action(GameLoop)
  @Action(GainCurrentGold)
  gainCurrentGold(ctx: StateContext<IGameState>) {
    const state = ctx.getState();
    this.store.dispatch(new GainGold(GameState.currentTownGoldGain(state)));
  }

  @Action(SpendGold)
  spendGold(ctx: StateContext<IGameState>, { gold }: SpendGold) {
    this.store.dispatch(new GainGold(-gold));
  }

  @Action(GainGold)
  @ImmutableContext()
  gainGold({ setState }: StateContext<IGameState>, { gold }: GainGold) {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);

      town.gold = town.gold + gold;
      if (town.gold < 0) { town.gold = 0n; }

      state.towns[state.currentTown] = town;

      return state;
    });
  }

  // building functions
  @Action(GameLoop)
  @ImmutableContext()
  validateBuildingConstructions({ setState }: StateContext<IGameState>) {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const now = Date.now();

      Object.keys(town.buildings).forEach(building => {
        const constructionDoneAt = town.buildings[building].constructionDoneAt;
        if (!constructionDoneAt || constructionDoneAt > now) { return; }

        town.buildings[building].constructionDoneAt = 0;
        town.buildings[building].level += 1;
      });

      return state;
    });
  }

  @Action(UpgradeBuilding)
  @ImmutableContext()
  upgradeBuilding({ setState }: StateContext<IGameState>, { building }: UpgradeBuilding) {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);

      town.buildings[building] = town.buildings[building] || { level: 0 };
      const buildingRef = town.buildings[building];

      buildingRef.constructionDoneAt = Date.now() + 1000 * BuildingData[building].upgradeTime(buildingRef.level + 1);
      return state;
    });
  }

  @Action(UpgradeBuildingFeature)
  @ImmutableContext()
  upgradeBuildingFeature({ setState }: StateContext<IGameState>, { building, feature, constructionTime }: UpgradeBuildingFeature) {
    setState((state: IGameState) => {
      return state;
    });
  }

  // ui functions
  @Action(ChooseInfo)
  @ImmutableContext()
  chooseInfo({ setState }: StateContext<IGameState>, { window }: ChooseInfo) {
    setState((state: IGameState) => {
      state.currentInfo = window;
      return state;
    });
  }

  @Action(OptionToggleUpgradeVisibility)
  @ImmutableContext()
  toggleUpgradeVisiblity({ setState }: StateContext<IGameState>) {
    setState((state: IGameState) => {
      state.options[GameOption.ToggleUpgradeVisiblity] = !state.options[GameOption.ToggleUpgradeVisiblity];
      return state;
    });
  }
}
