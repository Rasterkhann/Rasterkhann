
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { ImmutableContext } from '@ngxs-labs/immer-adapter';
import { sample, sum, random } from 'lodash';

import {
  GainCurrentGold, GainGold, SpendGold, ChooseInfo, GameLoop, UpgradeBuilding,
  LoadSaveData, UpgradeBuildingFeature, RerollHeroes,
  RecruitHero, DismissHero, RerollAdventures, StartAdventure, HeroGainEXP, HeroGainGold, NotifyMessage, OptionToggle,
  ScrapItem, RushBuilding, RushBuildingFeature, HeroStartOddJob, HeroStopOddJob, HeroSetLocation, HeroSetDestination, HeroRetire
} from '../actions';
import {
  GameTown, IGameState, ProspectiveHero, Hero, Building, Adventure, HeroStat, NewsItem, ItemType, HeroItem, HeroTrackedStat, TownStat
} from '../interfaces';
import {
  createDefaultSavefile, getCurrentTownFromState, calculateGoldGain,
  getCurrentTownProspectiveHeroes, getCurrentTownRecruitedHeroes, calculateProspectiveHeroMaxTotal,
  getCurrentTownActiveAdventures, getCurrentTownPotentialAdventures, calculateMaxPotentialAdventures,
  getCurrentTownCanDoAnyAdventures,
  calculateRestingRate,
  canHeroGoOnAdventure,
  giveHeroEXP,
  giveHeroGold,
  calculateRestingCost,
  getCurrentStat,
  calculateMaxCreatableItems,
  generateItem,
  calculateSecondsUntilNextItem,
  heroBuyItemsBeforeAdventure, unequipItem, equipItem,
  getCurrentTownItemsForSale, tickAdventure, checkHeroLevelUp,
  getCurrentTownFreeOddJobBuildings, increaseTrackedStat, formatNumber, calculateRepairRate, calculateRepairCost, increaseDurability
} from '../helpers';

import { environment } from '../../environments/environment';
import { BuildingData } from '../static';
import { HeroService } from '../services/hero.service';
import { AdventureService } from '../services/adventure.service';
import { Subject } from 'rxjs';

const GLOBAL_TIME_MULTIPLIER = environment.production ? 1000 : 10;
const ADVENTURE_TIME_MULTIPLIER = environment.production ? 1 : 0.01;

@State<IGameState>({
  name: 'gamestate',
  defaults: createDefaultSavefile()
})
@Injectable()
export class GameState {

  public removeHero$ = new Subject<string>();
  public hideHero$ = new Subject<string>();
  public showHero$ = new Subject<string>();
  public walkHero$ = new Subject<string>();

  @Selector()
  public static entireSavefile(state: IGameState): IGameState {
    return state;
  }

  @Selector()
  public static currentTown(state: IGameState): GameTown {
    return getCurrentTownFromState(state);
  }

  @Selector()
  public static currentTownGoldGain(state: IGameState): bigint {
    return calculateGoldGain(state);
  }

  @Selector()
  public static currentInfoWindow(state: IGameState): { window: string, autoOpen: boolean } {
    return { window: state.currentInfo, autoOpen: !!state.autoOpenInfo };
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

  @Selector()
  public static currentTownNotifications(state: IGameState): NewsItem[] {
    return state.towns[state.currentTown].recentNews;
  }

  @Selector()
  public static currentTownItemsForSale(state: IGameState): Record<ItemType, HeroItem[]> {
    return getCurrentTownItemsForSale(state);
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
    const messages: string[] = [];

    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const now = Date.now();

      Object.keys(town.buildings).forEach((building: Building) => {
        const constructionDoneAt = town.buildings[building].constructionDoneAt;
        if (constructionDoneAt && constructionDoneAt < now) {
          town.buildings[building].constructionStartedAt = 0;
          town.buildings[building].constructionDoneAt = 0;
          town.buildings[building].level += 1;

          messages.push(`${BuildingData[building].name} has finished construction for level ${town.buildings[building].level}!`);
        }

        Object.keys(town.buildings[building].featureConstruction || {}).forEach(feature => {
          if (feature.includes('-start')) { return; }

          const featureDoneAt = town.buildings[building].featureConstruction[feature];
          if (featureDoneAt && featureDoneAt < now) {
            delete town.buildings[building].featureConstruction[`${feature}-start`];
            delete town.buildings[building].featureConstruction[feature];
            town.buildings[building].features = town.buildings[building].features || {};
            town.buildings[building].features[feature] = town.buildings[building].features[feature] || 0;
            town.buildings[building].features[feature]++;

            messages.push(`${BuildingData[building].name} has finished work for the feature "${feature}"!`);
          }
        });
      });

      return state;
    });

    messages.forEach(msg => this.store.dispatch(new NotifyMessage(msg)));
  }

  @Action(UpgradeBuilding)
  @ImmutableContext()
  upgradeBuilding({ setState }: StateContext<IGameState>, { building }: UpgradeBuilding): void {
    let msg = '';

    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);

      const buildingRef = town.buildings[building];
      buildingRef.constructionStartedAt = Date.now();
      buildingRef.constructionDoneAt = Date.now() + (GLOBAL_TIME_MULTIPLIER * BuildingData[building].upgradeTime(buildingRef.level + 1));

      msg = `${BuildingData[building].name} has started construction for level ${town.buildings[building].level + 1}!`;
      return state;
    });

    this.store.dispatch(new NotifyMessage(msg));
  }

  @Action(RushBuilding)
  @ImmutableContext()
  rushBuilding({ setState }: StateContext<IGameState>, { building }: RushBuilding): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);

      const buildingRef = town.buildings[building];
      buildingRef.constructionDoneAt = 1;
      return state;
    });
  }

  @Action(UpgradeBuildingFeature)
  @ImmutableContext()
  upgradeBuildingFeature({ setState }: StateContext<IGameState>, { building, feature, constructionTime }: UpgradeBuildingFeature): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);

      town.buildings[building].featureConstruction = town.buildings[building].featureConstruction || {};
      town.buildings[building].featureConstruction[`${feature}-start`] = Date.now();
      town.buildings[building].featureConstruction[feature] = Date.now() + (GLOBAL_TIME_MULTIPLIER * constructionTime);

      return state;
    });

    this.store.dispatch(new NotifyMessage(`${BuildingData[building].name} has started work for the feature "${feature}"!`));
  }

  @Action(RushBuildingFeature)
  @ImmutableContext()
  rushBuildingFeature({ setState }: StateContext<IGameState>, { building, feature }: RushBuildingFeature): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);

      town.buildings[building].featureConstruction[feature] = 1;

      return state;
    });
  }

  // hero functions
  @Action(GameLoop)
  @ImmutableContext()
  heroLoop({ setState }: StateContext<IGameState>): void {
    const oddJobHeroes: string[] = [];
    const oddJobEarned: Record<string, number> = {};
    const messages: string[] = [];
    let totalEarned = 0;

    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);

      const restValue = calculateRestingRate(town);
      const restCost = calculateRestingCost(town);

      const repairValue = calculateRepairRate(town);
      const repairCost = calculateRepairCost(town);

      // rest
      town.recruitedHeroes.forEach(h => {
        if (h.onAdventure || canHeroGoOnAdventure(h)) { return; }

        let heroSpentGold = 0;

        // resting
        const heroRestSpendValue = getCurrentStat(h, HeroStat.GOLD) >= restCost ? restCost : 0;
        const heroRestValue = heroRestSpendValue === 0 ? 1 : restValue;

        if (heroRestSpendValue > 0) {
          giveHeroGold(h, -heroRestSpendValue);
          heroSpentGold += heroRestSpendValue;
        }

        [HeroStat.HP, HeroStat.SP, HeroStat.STA].forEach(stat => {
          h.currentStats[stat] = Math.min(h.currentStats[stat] + heroRestValue, h.stats[stat]);
        });

        // repairs
        const heroRepairSpendValue = getCurrentStat(h, HeroStat.GOLD) >= repairCost ? repairCost : 0;
        const heroRepairValue = heroRepairSpendValue === 0 ? 1 : repairValue;

        // only repair items that need it
        const items = (h.gear[ItemType.Weapon] as HeroItem[]).concat(h.gear[ItemType.Armor] as HeroItem[])
          .filter(i => i.curDurability !== i.maxDurability);

        items.forEach((item: HeroItem) => {
          increaseDurability(h, item, heroRepairValue);
        });

        if (items.length > 0 && heroRepairSpendValue > 0) {
          giveHeroGold(h, -heroRepairSpendValue);
          heroSpentGold += heroRepairSpendValue;
        }

        totalEarned += heroSpentGold;

        if (canHeroGoOnAdventure(h)) {
          messages.push(`${h.name} is now fully rested and ready to adventure again!`);
          this.showHero$.next(h.uuid);
        }
      });

      // start odd job
      town.recruitedHeroes.forEach(h => {
        if (h.onAdventure || h.currentlyWorkingAt || !canHeroGoOnAdventure(h)) { return; }
        if (random(1, 10) !== 1) { return; }

        oddJobHeroes.push(h.uuid);
      });

      // earn gold from odd job
      town.recruitedHeroes.forEach(h => {
        if (!h.currentlyWorkingAt) { return; }

        const earnedGold = town.buildings[h.currentlyWorkingAt].level;

        h.currentlyWorkingTicks = h.currentlyWorkingTicks || 0;
        h.currentlyWorkingTicks++;

        h.currentlyWorkingEarned = h.currentlyWorkingEarned || 0;
        h.currentlyWorkingEarned += earnedGold;

        oddJobEarned[h.uuid] = earnedGold;
      });

      return state;
    });

    if (totalEarned > 0) {
      this.store.dispatch(new GainGold(BigInt(totalEarned)));
    }

    oddJobHeroes.forEach(h => this.store.dispatch(new HeroStartOddJob(h)));
    Object.keys(oddJobEarned).forEach(heroId => this.store.dispatch(new HeroGainGold(heroId, oddJobEarned[heroId])));

    messages.forEach(msg => this.store.dispatch(new NotifyMessage(msg)));
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

      state.towns[state.currentTown].prospectiveHeroes.push(this.heroCreator.generateProspectiveHero(state.towns[state.currentTown]));

      return state;
    });
  }

  @Action(HeroGainEXP)
  @ImmutableContext()
  heroGainExp({ setState }: StateContext<IGameState>, { heroId, exp }: HeroGainEXP): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const heroRef = town.recruitedHeroes.find(h => h.uuid === heroId);
      if (!heroRef) { return state; }

      giveHeroEXP(heroRef, exp);
      checkHeroLevelUp(heroRef);

      return state;
    });
  }

  @Action(HeroStartOddJob)
  @ImmutableContext()
  heroStartOddJob({ setState }: StateContext<IGameState>, { heroId }: HeroStartOddJob): void {
    let resMsg = '';

    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const heroRef = town.recruitedHeroes.find(h => h.uuid === heroId);
      if (!heroRef || heroRef.onAdventure) { return state; }

      const buildings = getCurrentTownFreeOddJobBuildings(state);
      if (buildings.length === 0) { return state; }

      const building = sample(buildings);
      if (!building) { return state; }

      heroRef.currentlyWorkingAt = building;
      heroRef.currentlyWorkingTicks = 0;
      heroRef.currentlyWorkingEarned = 0;
      town.buildings[building].currentWorkerId = heroId;

      resMsg = `${heroRef.name} has begun working at the ${building}!`;

      return state;
    });

    if (resMsg) {
      this.store.dispatch(new NotifyMessage(resMsg));
    }
  }

  @Action(HeroStopOddJob)
  @ImmutableContext()
  heroStopOddJob({ setState }: StateContext<IGameState>, { heroId }: HeroStopOddJob): void {
    let resMsg = '';

    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const heroRef = town.recruitedHeroes.find(h => h.uuid === heroId);
      if (!heroRef || !heroRef.currentlyWorkingAt) { return state; }

      const building = heroRef.currentlyWorkingAt;
      town.buildings[building].currentWorkerId = null;
      heroRef.currentlyWorkingAt = null;

      heroRef.currentlyAtBuilding = null;

      increaseTrackedStat(heroRef, HeroTrackedStat.OddJobsDone);
      increaseTrackedStat(heroRef, HeroTrackedStat.OddJobsMoney, heroRef.currentlyWorkingEarned);

      if (heroRef.currentlyWorkingEarned > 0) {
        const totalEarned = formatNumber(heroRef.currentlyWorkingEarned);
        resMsg = `${heroRef.name} earned ${totalEarned} GOLD from working at the ${building}!`;
      }

      return state;
    });

    if (resMsg) {
      this.store.dispatch(new NotifyMessage(resMsg));
    }
  }

  @Action(HeroSetLocation)
  @ImmutableContext()
  heroSetLocation({ setState }: StateContext<IGameState>, { heroId, building }: HeroSetLocation): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const heroRef = town.recruitedHeroes.find(h => h.uuid === heroId);
      if (!heroRef) { return state; }

      heroRef.currentlyAtBuilding = building;
      heroRef.goingToBuilding = null;

      return state;
    });

    // we don't want them to all walk right away
    setTimeout(() => {
      this.walkHero$.next(heroId);
    }, random(1000, 10000));
  }

  @Action(HeroSetDestination)
  @ImmutableContext()
  heroSetDestination({ setState }: StateContext<IGameState>, { heroId, building }: HeroSetDestination): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const heroRef = town.recruitedHeroes.find(h => h.uuid === heroId);
      if (!heroRef) { return state; }

      heroRef.goingToBuilding = building;

      return state;
    });

    // we don't want them to all walk right away
    setTimeout(() => {
      this.walkHero$.next(heroId);
    }, random(1000, 10000));
  }

  @Action(HeroGainGold)
  @ImmutableContext()
  heroGainGold({ setState }: StateContext<IGameState>, { heroId, gold }: HeroGainGold): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const heroRef = town.recruitedHeroes.find(h => h.uuid === heroId);
      if (!heroRef) { return state; }

      giveHeroGold(heroRef, gold);

      return state;
    });
  }

  @Action(HeroRetire)
  @ImmutableContext()
  heroRetire({ setState }: StateContext<IGameState>, { heroId }: HeroRetire): void {
    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      const heroRef = town.recruitedHeroes.find(h => h.uuid === heroId);
      if (!heroRef) { return state; }

      town.stats[TownStat.Levels][heroRef.job] += BigInt(getCurrentStat(heroRef, HeroStat.LVL));
      town.stats[TownStat.Retires][heroRef.job] += 1n;

      town.crystalCurrency = town.crystalCurrency || {};
      town.crystalCurrency[heroRef.job] = town.crystalCurrency[heroRef.job] || 0;
      town.crystalCurrency[heroRef.job] += 1;

      console.log(town.crystalCurrency)

      return state;
    });

    this.store.dispatch(new DismissHero(heroId));
  }

  @Action(DismissHero)
  @ImmutableContext()
  dismissHero({ setState }: StateContext<IGameState>, { heroId }: DismissHero): void {

    this.store.dispatch(new HeroStopOddJob(heroId));

    setState((state: IGameState) => {
      state.towns[state.currentTown].recruitedHeroes = state.towns[state.currentTown].recruitedHeroes
        .filter(x => x.uuid !== heroId);
      this.removeHero$.next(heroId);

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
    const heroStops: string[] = [];
    const messages: string[] = [];

    let totalEarnedFromAdventurers: bigint = 0n;

    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);

      heroes.forEach(h => {
        town.recruitedHeroes.forEach((rh, i) => {
          if (h.uuid !== rh.uuid) { return; }

          heroStops.push(rh.uuid);
          this.hideHero$.next(rh.uuid);

          town.recruitedHeroes[i] = { ...rh };
          town.recruitedHeroes[i].onAdventure = adventure.uuid;
          const boughtItems = heroBuyItemsBeforeAdventure(town, town.recruitedHeroes[i]);

          // buy potions
          const boughtPotions = boughtItems[ItemType.Potion];
          boughtPotions.forEach((item: HeroItem) => {
            town.recruitedHeroes[i].gear[ItemType.Potion].push(item);
          });

          // buy weapons
          const boughtWeapons = boughtItems[ItemType.Weapon];
          boughtWeapons.forEach((weap, weapIndex) => {
            if (!weap) { return; }

            // we get weapons back in the exact order that they should be applied, which could be a jagged array
            const curSlotWeapon = town.recruitedHeroes[i].gear[ItemType.Weapon][weapIndex];
            if (curSlotWeapon) {
              unequipItem(town.recruitedHeroes[i], curSlotWeapon);
            }

            equipItem(town.recruitedHeroes[i], weap, weapIndex);
          });

          // buy weapons
          const boughtArmors = boughtItems[ItemType.Armor];
          boughtArmors.forEach((arm, armIndex) => {
            if (!arm) { return; }

            // we get armors back in the exact order that they should be applied, which could be a jagged array
            const curArmor = town.recruitedHeroes[i].gear[ItemType.Armor][armIndex];
            if (curArmor) {
              unequipItem(town.recruitedHeroes[i], curArmor);
            }

            equipItem(town.recruitedHeroes[i], arm, armIndex);
          });

          // remove the "cost" prop on each item; it's no longer necessary
          const allBoughtItems = boughtItems[ItemType.Potion]
            .concat(boughtItems[ItemType.Armor])
            .concat(boughtItems[ItemType.Weapon])
            .filter(Boolean);

          const boughtUUIDs = allBoughtItems.map(item => item.uuid);
          Object.keys(town.itemsForSale).forEach((itemType: ItemType) => {
            town.itemsForSale[itemType] = town.itemsForSale[itemType].filter(item => !boughtUUIDs.includes(item.uuid));
          });

          const totalEarned: bigint = BigInt(sum(allBoughtItems.map(item => item.cost)));

          town.recruitedHeroes[i].currentStats[HeroStat.GOLD] -= Number(totalEarned);
          totalEarnedFromAdventurers += totalEarned;

          if (allBoughtItems.length > 0) {
            const allItemNames = allBoughtItems.map(item => item.name);
            messages.push(`${town.recruitedHeroes[i].name} purchased ${allItemNames.join(', ')}.`);
          }

        });
      });

      const modAdventure = { ...adventure };
      const isThereACaveWorkerMultiplier = town.buildings[Building.Cave].currentWorkerId ? 0.75 : 1;
      const totalMultiplier = isThereACaveWorkerMultiplier * ADVENTURE_TIME_MULTIPLIER;

      modAdventure.activeHeroes = heroes.map(h => h.uuid);

      // scale these down for dev to make testing less painful
      modAdventure.encounterTicks = modAdventure.encounterTicks.map(x => Math.floor(Math.max(1, x * totalMultiplier)));

      state.towns[state.currentTown].activeAdventures.push(modAdventure);
      state.towns[state.currentTown].potentialAdventures = state.towns[state.currentTown].potentialAdventures
        .filter(x => x.uuid !== adventure.uuid);

      state.towns[state.currentTown].potentialAdventures.push(this.advCreator.generateAdventure(town));

      messages.push(`${heroes.map(x => x.name).join(', ')} ${heroes.length === 1 ? 'has' : 'have'} embarked on an adventure.`);

      return state;
    });

    if (totalEarnedFromAdventurers > 0n) {
      this.store.dispatch(new GainGold(totalEarnedFromAdventurers));
    }

    heroStops.forEach(heroId => this.store.dispatch(new HeroStopOddJob(heroId)));
    messages.forEach(msg => this.store.dispatch(new NotifyMessage(msg)));

    setTimeout(() => {
      heroes.forEach(h => {
        this.store.dispatch(new HeroSetLocation(h.uuid, Building.Cave));
      });
    }, 0);
  }

  @Action(GameLoop)
  @ImmutableContext()
  adventureTick({ setState }: StateContext<IGameState>): void {
    let resMsg = '';

    const bumpHeroIds: string[] = [];

    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);
      town.activeAdventures.forEach(adv => {
        const result = tickAdventure(state.towns[state.currentTown], adv);

        // adventure over
        if (result) {
          resMsg = result;

          adv.activeHeroes.forEach(heroId => bumpHeroIds.push(heroId));
        }
      });

      return state;
    });

    if (resMsg) {
      this.store.dispatch(new NotifyMessage(resMsg));
    }

    setTimeout(() => {
      bumpHeroIds.forEach(heroId => this.store.dispatch(new HeroSetLocation(heroId, Building.Inn)));
    }, 0);
  }

  // item functions
  @Action(GameLoop)
  @ImmutableContext()
  itemCreationTick({ setState }: StateContext<IGameState>): void {
    const messages: string[] = [];

    setState((state: IGameState) => {
      const town = getCurrentTownFromState(state);

      const now = Date.now();

      Object.keys(ItemType).forEach((itemType: ItemType) => {

        // check if we can make new items - aka, at capacity
        const maxItemsOfType = calculateMaxCreatableItems(town, itemType);
        if (town.itemsForSale[itemType].length >= maxItemsOfType) { return; }

        // check if we can make new items via time
        if (now < town.nextItemCreation[itemType]) { return; }

        const item = generateItem(town, itemType);
        town.itemsForSale[itemType].push(item);
        town.nextItemCreation[itemType] = Date.now() + (GLOBAL_TIME_MULTIPLIER * calculateSecondsUntilNextItem(town, itemType));

        messages.push(`A new item "${item.name}" was listed for sale.`);
      });

      return state;
    });

    messages.forEach(msg => this.store.dispatch(new NotifyMessage(msg)));
  }

  // item functions
  @Action(ScrapItem)
  @ImmutableContext()
  scrapItem({ setState }: StateContext<IGameState>, { item }: ScrapItem): void {
    setState((state: IGameState) => {
      state.towns[state.currentTown].itemsForSale[item.type] = state.towns[state.currentTown].itemsForSale[item.type]
                                                                 .filter(i => i.uuid !== item.uuid);
      return state;
    });
  }

  // ui functions
  @Action(ChooseInfo)
  @ImmutableContext()
  chooseInfo({ setState }: StateContext<IGameState>, { window, autoOpen }: ChooseInfo): void {
    setState((state: IGameState) => {
      state.currentInfo = window;
      state.autoOpenInfo = autoOpen;
      return state;
    });
  }

  @Action(NotifyMessage)
  @ImmutableContext()
  notification({ setState }: StateContext<IGameState>, { notification }: NotifyMessage): void {
    setState((state: IGameState) => {
      state.towns[state.currentTown].recentNews.unshift({
        timestamp: Date.now(),
        message: notification
      });

      while (state.towns[state.currentTown].recentNews.length > 25) { state.towns[state.currentTown].recentNews.pop(); }

      return state;
    });
  }

  @Action(OptionToggle)
  @ImmutableContext()
  toggleOption({ setState }: StateContext<IGameState>, { option }: OptionToggle): void {
    setState((state: IGameState) => {
      state.options[option] = !state.options[option];
      return state;
    });
  }
}
