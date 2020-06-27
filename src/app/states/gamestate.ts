
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';

import { GainCurrentGold, GainGold, SpendGold } from '../actions';

export interface IGameTown {
  name: string;
  gold: bigint;
  goldPerTick: bigint;
}

export interface IGameState {
  currentTown: string;
  towns: Record<string, IGameTown>;
}

export function beforeSerialize(obj) {

  // if there's a gamestate, serialize the bigints and do another bunch of immutable-juggling
  if (obj.gamestate) {
    obj = { ...obj };
    obj.gamestate = { ...obj.gamestate };
    obj.gamestate.towns = {... obj.gamestate.towns };

    Object.keys(obj.gamestate.towns).forEach(townName => {
      const town = { ...obj.gamestate.towns[townName] };
      town.gold = town.gold.toString();
      town.goldPerTick = town.goldPerTick.toString();

      obj.gamestate.towns[townName] = town;
    });
  }

  return obj;
}

export function afterDeserialize(obj) {

  // if there's a gamestate, deserialize the bigints
  if (obj.gamestate) {
    Object.keys(obj.gamestate.towns).forEach(townName => {
      const town = obj.gamestate.towns[townName];
      town.gold = BigInt(town.gold);
      town.goldPerTick = BigInt(town.goldPerTick);
    });
  }

  return obj;
}

function createBasicTown(): Partial<IGameTown> {
  return {
    gold: 0n,
    goldPerTick: 0n
  };
}

function getCurrentTownFromState(state: IGameState): IGameTown {
  return { name: state.currentTown, ...state.towns[state.currentTown] };
}

@State<IGameState>({
  name: 'gamestate',
  defaults: {
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

  constructor(private store: Store) {}

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
}
