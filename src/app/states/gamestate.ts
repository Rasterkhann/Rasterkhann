
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';

import { GainCurrentGold, GainGold, SpendGold, ChooseInfo, GameLoop, UpgradeBuilding,
  LoadSaveData, OptionToggleUpgradeVisibility, UpgradeBuildingFeature, RerollHeroes, RecruitHero } from '../actions';
import { IGameTown, IGameState, GameOption } from '../interfaces';
import { GameService } from '../game.service';
import { createDefaultSavefile, getCurrentTownFromState, calculateGoldGain } from '../helpers';

import { environment } from '../../environments/environment';
import { BuildingData } from '../static';

const GLOBAL_TIME_MULTIPLIER = environment.production ? 1000 : 10;

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

  constructor(private store: Store, private game: GameService) {}

  // misc functions
  @Action(GameLoop)
  @ImmutableContext()
  updateTimestamp({ setState }: StateContext<IGameState>): void {
    setState((state: IGameState) => {
      state.lastTimestamp = Date.now();
      return state;
    });
  }

  @Action(LoadSaveData)
  @ImmutableContext()
  loadSaveData({ setState }: StateContext<IGameState>, { gamestate }: LoadSaveData): void {
    setState(() => {
      return gamestate;
    });
  }

  // gold functions
  @Action(GameLoop)
  @Action(GainCurrentGold)
  gainCurrentGold(ctx: StateContext<IGameState>): void {
    const state = ctx.getState();
    this.store.dispatch(new GainGold(GameState.currentTownGoldGain(state)));
  }

  @Action(SpendGold)
  spendGold(ctx: StateContext<IGameState>, { gold }: SpendGold): void {
    this.store.dispatch(new GainGold(-gold));
  }

  @Action(GainGold)
  @ImmutableContext()
  gainGold({ setState }: StateContext<IGameState>, { gold }: GainGold): void {
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
  validateBuildingConstructions({ setState }: StateContext<IGameState>): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const now = Date.now();

      Object.keys(town.buildings).forEach(building => {
        const constructionDoneAt = town.buildings[building].constructionDoneAt;
        if (constructionDoneAt && constructionDoneAt < now) {
          town.buildings[building].constructionDoneAt = 0;
          town.buildings[building].level += 1;
        }

        Object.keys(town.buildings[building].featureConstruction || {}).forEach(feature => {
          const featureDoneAt = town.buildings[building].featureConstruction[feature];
          if (featureDoneAt && featureDoneAt < now) {
            delete town.buildings[building].featureConstruction[feature];
            town.buildings[building].features = town.buildings[building].features || {};
            town.buildings[building].features[feature] = town.buildings[building].features[feature] || 0;
            town.buildings[building].features[feature]++;
          }
        });
      });

      return state;
    });
  }

  @Action(UpgradeBuilding)
  @ImmutableContext()
  upgradeBuilding({ setState }: StateContext<IGameState>, { building }: UpgradeBuilding): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);

      town.buildings[building] = town.buildings[building] || { level: 0 };
      const buildingRef = town.buildings[building];

      buildingRef.constructionDoneAt = Date.now() + (GLOBAL_TIME_MULTIPLIER * BuildingData[building].upgradeTime(buildingRef.level + 1));
      return state;
    });
  }

  @Action(UpgradeBuildingFeature)
  @ImmutableContext()
  upgradeBuildingFeature({ setState }: StateContext<IGameState>, { building, feature, constructionTime }: UpgradeBuildingFeature): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);

      town.buildings[building].featureConstruction = town.buildings[building].featureConstruction || {};
      town.buildings[building].featureConstruction[feature] = Date.now() + (GLOBAL_TIME_MULTIPLIER * constructionTime);

      return state;
    });
  }

  // hero functions
  @Action(RerollHeroes)
  @ImmutableContext()
  rerollHeroes({ setState }: StateContext<IGameState>): void {
    setState((state: IGameState) => {
      return state;
    });
  }

  @Action(RecruitHero)
  @ImmutableContext()
  recruitHero({ setState }: StateContext<IGameState>, { hero }: RecruitHero): void {
    setState((state: IGameState) => {
      return state;
    });
  }

  // ui functions
  @Action(ChooseInfo)
  @ImmutableContext()
  chooseInfo({ setState }: StateContext<IGameState>, { window }: ChooseInfo): void {
    setState((state: IGameState) => {
      state.currentInfo = window;
      return state;
    });
  }

  @Action(OptionToggleUpgradeVisibility)
  @ImmutableContext()
  toggleUpgradeVisiblity({ setState }: StateContext<IGameState>): void {
    setState((state: IGameState) => {
      state.options[GameOption.ToggleUpgradeVisiblity] = !state.options[GameOption.ToggleUpgradeVisiblity];
      return state;
    });
  }
}
