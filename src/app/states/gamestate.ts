
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';

import { GainCurrentGold, GainGold, SpendGold, ChooseInfo } from '../actions';
import { IGameTown, IGameState, Building } from '../interfaces';

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

  // if there's a gamestate, deserialize the bigints
  if (obj.towns) {
    Object.keys(obj.towns).forEach(townName => {
      const town = obj.towns[townName];
      town.gold = BigInt(town.gold);
      town.goldPerTick = BigInt(town.goldPerTick);
    });
  }

  return obj;
}

function createBasicTown(): Partial<IGameTown> {
  return {
    gold: 0n,
    goldPerTick: 0n,

    buildings: {
      [Building.TownHall]: {
        level: 1
      },

      [Building.House]: {
        level: 3
      }
    }
  };
}

function getCurrentTownFromState(state: IGameState): IGameTown {
  return { name: state.currentTown, ...state.towns[state.currentTown] };
}

@State<IGameState>({
  name: 'gamestate',
  defaults: {
    currentInfo: Building.TownHall,
    currentTown: 'Rasterkhann',
    towns: {
      Rasterkhann: createBasicTown() as IGameTown
    }
  }
})
@Injectable()
export class GameState {

  @Selector()
  @ImmutableSelector()
  public static currentTown(state: IGameState): IGameTown {
    return getCurrentTownFromState(state);
  }

  @Selector()
  @ImmutableSelector()
  public static currentInfoWindow(state: IGameState): string {
    return state.currentInfo;
  }

  constructor(private store: Store) {}

  // gold functions
  @Action(GainCurrentGold)
  gainCurrentGold(ctx: StateContext<IGameState>) {
    const state = ctx.getState();
    const town = getCurrentTownFromState(state);
    this.store.dispatch(new GainGold(town.goldPerTick));
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

  // ui functions
  @Action(ChooseInfo)
  @ImmutableContext()
  chooseInfo({ setState }: StateContext<IGameState>, { window }: ChooseInfo) {
    setState((state: IGameState) => {
      state.currentInfo = window;
      return state;
    });
  }
}
