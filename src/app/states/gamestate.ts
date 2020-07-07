
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { ImmutableContext } from '@ngxs-labs/immer-adapter';

import {
  GainCurrentGold, GainGold, SpendGold, ChooseInfo, GameLoop, UpgradeBuilding,
  LoadSaveData, OptionToggleUpgradeVisibility, UpgradeBuildingFeature, RerollHeroes,
  RecruitHero, DismissHero, RerollAdventures, StartAdventure, HeroGainEXP, HeroGainGold
} from '../actions';
import {
  IGameTown, IGameState, GameOption, ProspectiveHero, Hero, Building, Adventure, HeroStat
} from '../interfaces';
import {
  createDefaultSavefile, getCurrentTownFromState, calculateGoldGain,
  getCurrentTownProspectiveHeroes, getCurrentTownRecruitedHeroes, calculateProspectiveHeroMaxTotal,
  getCurrentTownActiveAdventures, getCurrentTownPotentialAdventures, calculateMaxPotentialAdventures,
  getCurrentTownCanDoAnyAdventures, doAdventureEncounter, finalizeAdventure, checkHeroLevelUp,
  calculateRestingRate
} from '../helpers';

import { environment } from '../../environments/environment';
import { BuildingData } from '../static';
import { HeroService } from '../services/hero.service';
import { AdventureService } from '../services/adventure.service';

const GLOBAL_TIME_MULTIPLIER = environment.production ? 1000 : 10;
const ADVENTURE_TIME_MULTIPLIER = environment.production ? 1 : 0.01;

@State<IGameState>({
  name: 'gamestate',
  defaults: createDefaultSavefile()
})
@Injectable()
export class GameState {

  @Selector()
  public static entireSavefile(state: IGameState): IGameState {
    return state;
  }

  @Selector()
  public static currentTown(state: IGameState): IGameTown {
    return getCurrentTownFromState(state);
  }

  @Selector()
  public static currentTownGoldGain(state: IGameState): bigint {
    return calculateGoldGain(state);
  }

  @Selector()
  public static currentInfoWindow(state: IGameState): string {
    return state.currentInfo;
  }

  @Selector()
  public static currentTownCanDoAdventures(state: IGameState): boolean {
    return getCurrentTownCanDoAnyAdventures(state);
  }

  @Selector()
  public static currentTownProspectiveHeroes(state: IGameState): ProspectiveHero[] {
    return getCurrentTownProspectiveHeroes(state);
  }

  @Selector()
  public static currentTownRecruitedHeroes(state: IGameState): Hero[] {
    return getCurrentTownRecruitedHeroes(state);
  }

  @Selector()
  public static currentTownActiveAdventures(state: IGameState): Adventure[] {
    return getCurrentTownActiveAdventures(state);
  }

  @Selector()
  public static currentTownPotentialAdventures(state: IGameState): Adventure[] {
    return getCurrentTownPotentialAdventures(state);
  }

  constructor(
    private store: Store,
    private heroCreator: HeroService,
    private advCreator: AdventureService
  ) {}

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

      Object.keys(town.buildings).forEach((building: Building) => {
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
  @Action(GameLoop)
  @ImmutableContext()
  restHeroes({ setState }: StateContext<IGameState>): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);

      const restValue = calculateRestingRate(town);

      town.recruitedHeroes.forEach(h => {
        if (h.onAdventure) { return; }

        [HeroStat.HP, HeroStat.SP, HeroStat.STA].forEach(stat => {
          h.currentStats[stat] = Math.min(h.currentStats[stat] + restValue, h.stats[stat]);
        });
      });

      return state;
    });
  }

  @Action(RerollHeroes)
  @ImmutableContext()
  rerollHeroes({ setState }: StateContext<IGameState>): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const prospectiveHeroes: ProspectiveHero[] = [];

      const totalProspects = calculateProspectiveHeroMaxTotal(town);
      for (let i = 0; i < totalProspects; i++) {
        prospectiveHeroes.push(this.heroCreator.generateProspectiveHero(town));
      }

      state.towns[state.currentTown].prospectiveHeroes = prospectiveHeroes;

      return state;
    });
  }

  @Action(RecruitHero)
  @ImmutableContext()
  recruitHero({ setState }: StateContext<IGameState>, { hero }: RecruitHero): void {
    setState((state: IGameState) => {
      const heroRecruit = { ...hero.hero };
      heroRecruit.currentStats = { ...heroRecruit.currentStats };
      heroRecruit.currentStats.exp = 0;

      heroRecruit.stats = { ...heroRecruit.stats };
      heroRecruit.stats.gold = 0;

      state.towns[state.currentTown].recruitedHeroes.push(heroRecruit);
      state.towns[state.currentTown].prospectiveHeroes = state.towns[state.currentTown].prospectiveHeroes
        .filter(x => x.hero.uuid !== heroRecruit.uuid);

      return state;
    });
  }

  @Action(HeroGainEXP)
  @ImmutableContext()
  heroGainExp({ setState }: StateContext<IGameState>, { hero, exp }: HeroGainEXP): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const heroRef = town.recruitedHeroes.find(h => h.uuid === hero.uuid);
      if (!heroRef) { return state; }

      heroRef.currentStats[HeroStat.EXP] += exp;
      checkHeroLevelUp(heroRef);

      return state;
    });
  }

  @Action(HeroGainGold)
  @ImmutableContext()
  heroGainGold({ setState }: StateContext<IGameState>, { hero, gold }: HeroGainGold): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const heroRef = town.recruitedHeroes.find(h => h.uuid === hero.uuid);
      if (!heroRef) { return state; }

      heroRef.currentStats[HeroStat.GOLD] += gold;
      checkHeroLevelUp(heroRef);

      return state;
    });
  }

  @Action(DismissHero)
  @ImmutableContext()
  dismissHero({ setState }: StateContext<IGameState>, { hero }: DismissHero): void {
    setState((state: IGameState) => {
      state.towns[state.currentTown].recruitedHeroes = state.towns[state.currentTown].recruitedHeroes
        .filter(x => x.uuid !== hero.uuid);

      return state;
    });
  }

  // adventure functions
  @Action(RerollAdventures)
  @ImmutableContext()
  rerollAdventures({ setState }: StateContext<IGameState>): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const potentialAdventures: Adventure[] = [];

      const totalProspects = calculateMaxPotentialAdventures(town);
      for (let i = 0; i < totalProspects; i++) {
        potentialAdventures.push(this.advCreator.generateAdventure(town));
      }
      state.towns[state.currentTown].potentialAdventures = potentialAdventures;
      return state;
    });
  }

  @Action(StartAdventure)
  @ImmutableContext()
  startAdventure({ setState }: StateContext<IGameState>, { heroes, adventure }: StartAdventure): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      heroes.forEach(h => {
        town.recruitedHeroes.forEach((rh, i) => {
          if (h.uuid !== rh.uuid) { return; }

          town.recruitedHeroes[i] = { ...rh };
          town.recruitedHeroes[i].onAdventure = adventure.uuid;
        });
      });

      const modAdventure = { ...adventure };

      modAdventure.activeHeroes = heroes.map(h => h.uuid);

      // scale these down for dev to make testing less painful
      modAdventure.encounterTicks = modAdventure.encounterTicks.map(x => x * ADVENTURE_TIME_MULTIPLIER);

      state.towns[state.currentTown].activeAdventures.push(modAdventure);
      state.towns[state.currentTown].potentialAdventures = state.towns[state.currentTown].potentialAdventures
        .filter(x => x.uuid !== adventure.uuid);

      return state;
    });
  }

  @Action(GameLoop)
  @ImmutableContext()
  adventureTick({ setState }: StateContext<IGameState>): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      town.activeAdventures.forEach(adv => {
        adv.encounterTicks[0]--;
        if (adv.encounterTicks[0] < 0) {
          doAdventureEncounter(town, adv);
          adv.encounterTicks.shift();
        }

        if (adv.encounterTicks.length === 0) {
          finalizeAdventure(town, adv);
          state.towns[state.currentTown].activeAdventures = state.towns[state.currentTown]
            .activeAdventures.filter(a => a.uuid !== adv.uuid);
        }
      });

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
