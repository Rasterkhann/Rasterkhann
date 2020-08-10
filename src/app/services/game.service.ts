
import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AlertController } from '@ionic/angular';

import { timer, Observable } from 'rxjs';
import { delay, first } from 'rxjs/operators';

import { ChooseInfo, GameLoop, SpendGold, UpgradeBuilding, LoadSaveData,
  UpgradeBuildingFeature, RerollHeroes, HeroRecruit, HeroDismiss, RerollAdventures,
  StartAdventure, HeroGainEXP, OptionToggle, ScrapItem, RushBuilding, RushBuildingFeature,
  HeroRetire, AllocateAllToBuilding, AllocateSomeToBuilding, UnallocateAllFromBuilding,
  HeroQueueDismiss,
  HeroQueueRetire,
  HeroQueueDismissCancel,
  HeroQueueRetireCancel,
  JobCrystalUpgradeStat,
  RerollBooks,
  BookBuy,
  HeroForgetSkill,
  HeroLearnSkill,
  BookDestroy,
  ChangeWorkerAutoAllocationBuilding
} from '../actions';
import { Building, GameTown, IGameState, BuildingFeature, Hero,
  ProspectiveHero, Adventure, HeroStat, GameOption, HeroItem, HeroTrackedStat, HeroJob, TownStat, SkillBook } from '../interfaces';
import { doesTownHaveFeature, featureByName, getCurrentStat, calculateMaxOwnedBooks } from '../helpers';
import { BuildingData } from '../static';
import { AdventureService } from './adventure.service';
import { HeroService } from './hero.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private isStartingAdventure: boolean;

  @Select((state: any) => state.gamestate.options[GameOption.ShowConfirmationDialogs]) confirmationDialogs$: Observable<boolean>;

  constructor(
    private alert: AlertController,
    private store: Store,
    private advCreator: AdventureService,
    private heroCreator: HeroService,
    public logger: LoggerService
  ) {
    this.init();
  }

  private init(): void {
    this.startGameLoop();
  }

  private startGameLoop(): void {
    timer(0, 1000).subscribe(() => {
      this.store.dispatch(new GameLoop());
    });
  }

  // ui functions
  public changeInfo(newWindow: string, autoOpen = false): void {
    if (!newWindow) { return; }
    this.store.dispatch(new ChooseInfo(newWindow, autoOpen));
  }

  public loadState(state: IGameState): void {
    this.store.dispatch(new LoadSaveData(state));
  }

  public toggleOption(option: GameOption): void {
    this.store.dispatch(new OptionToggle(option));
  }

  public doSimpleConfirmation(
    { header, message, confirmText }: { header: string, message: string, confirmText: string },
    finalize: () => void
  ): void {
    this.doConfirmation(
      { header, message, buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: confirmText,
          handler: async () => {
            finalize();
          }
        }
      ] },
      finalize
    );
  }

  public doConfirmation(
    { header, message, buttons }: { header: string, message: string, buttons: any[] },
    finalize: () => void
  ): void {
    this.confirmationDialogs$.pipe(first())
      .subscribe(async showDialog => {
        if (!showDialog) {
          finalize();
          return;
        }

        const alert = await this.alert.create({ header, message, buttons });
        await alert.present();
      });
  }

  // building functions
  public featureByName(building: Building, feature: string): BuildingFeature {
    return featureByName(building, feature);
  }

  public doesTownHaveFeature(town: GameTown, feature: string): boolean {
    return doesTownHaveFeature(town, feature);
  }

  public buildingCost(building: Building, level = 1): bigint {
    return BuildingData[building].levelCost(level);
  }

  public buildingRushCost(town: GameTown, building: Building, level = 1): bigint {
    const doneAt = town.buildings[building].constructionDoneAt;
    const startedAt = town.buildings[building].constructionStartedAt;
    const baseCost = this.buildingCost(building, level) / 2n;
    if (!doneAt || !startedAt) { return baseCost; }

    const secondsTotal = (doneAt - startedAt) / 1000;
    const secondsLeft = (doneAt - Date.now()) / 1000;

    return BigInt(Math.floor(Number(baseCost) * (secondsLeft / secondsTotal)));
  }

  public buildingFeatureCost(building: Building, feature: string): bigint {
    return this.featureByName(building, feature).cost;
  }

  public buildingFeatureRushCost(town: GameTown, building: Building, feature: string): bigint {
    const doneAt = town.buildings[building].featureConstruction[feature];
    const startedAt = town.buildings[building].featureConstruction[`${feature}-start`];
    const baseCost = this.buildingFeatureCost(building, feature) / 2n;
    if (!doneAt || !startedAt) { return baseCost; }

    const secondsTotal = (doneAt - startedAt) / 1000;
    const secondsLeft = (doneAt - Date.now()) / 1000;

    return BigInt(Math.floor(Number(baseCost) * (secondsLeft / secondsTotal)));
  }

  public buildingFeatureTime(building: Building, feature: string): number {
    return this.featureByName(building, feature).upgradeTime;
  }

  public canSeeBuildingFeature(town: GameTown, building: Building, feature: string): boolean {
    const featureRef: BuildingFeature = this.featureByName(building, feature);
    if (!featureRef) { return false; }

    if (this.doesTownHaveFeature(town, feature)) { return false; }

    if (featureRef.requiresLevel && town.buildings[building].level < featureRef.requiresLevel) { return false; }

    if (featureRef.requiresFeature) {
      const allPreFeatures = Object.keys(featureRef.requiresFeature)
        .every(feat => this.doesTownHaveFeature(town, feat));
      if (!allPreFeatures) { return false; }
    }

    return true;
  }

  public nextLevelForBuilding(town: GameTown, building: Building): number {
    return town.buildings[building] ? town.buildings[building].level + 1 : 1;
  }

  public canUpgradeBuilding(town: GameTown, building: Building): boolean {
    if (town.buildings[building]) {
      const isConstructing = town.buildings[building].constructionDoneAt;
      if (isConstructing) { return false; }
    }

    const nextLevelCost = this.buildingCost(building, this.nextLevelForBuilding(town, building));
    if (nextLevelCost === 0n) { return false; }

    return town.gold >= nextLevelCost;
  }

  public canRushBuilding(town: GameTown, building: Building): boolean {
    if (town.buildings[building]) {
      const isConstructing = town.buildings[building].constructionDoneAt;
      if (!isConstructing || isConstructing === 1) { return false; }
    }

    const nextLevelCost = this.buildingRushCost(town, building, this.nextLevelForBuilding(town, building));
    if (nextLevelCost === 0n) { return false; }

    return town.gold >= nextLevelCost;
  }

  public canUpgradeBuildingFeature(town: GameTown, building: Building, feature: string): boolean {
    if (town.buildings[building].featureConstruction) {
      const isConstructing = town.buildings[building].featureConstruction[feature];
      if (isConstructing) { return false; }
    }

    const nextLevelCost = this.buildingFeatureCost(building, feature);
    if (nextLevelCost === 0n) { return false; }

    return this.canSeeBuildingFeature(town, building, feature) && town.gold >= nextLevelCost;
  }

  public canRushBuildingFeature(town: GameTown, building: Building, feature: string): boolean {
    if (town.buildings[building].featureConstruction) {
      const isConstructing = town.buildings[building].featureConstruction[feature];
      if (!isConstructing || isConstructing === 1) { return false; }
    }

    const nextLevelCost = this.buildingFeatureRushCost(town, building, feature);
    if (nextLevelCost === 0n) { return false; }

    return this.canSeeBuildingFeature(town, building, feature) && town.gold >= nextLevelCost;
  }

  public upgradeBuilding(town: GameTown, building: Building): void {
    if (!this.canUpgradeBuilding(town, building)) { return; }

    this.store.dispatch(new UpgradeBuilding(building))
      .subscribe(() => {
        this.store.dispatch(new SpendGold(this.buildingCost(building, this.nextLevelForBuilding(town, building))));
      });
  }

  public rushBuilding(town: GameTown, building: Building): void {
    if (!this.canRushBuilding(town, building)) { return; }

    this.store.dispatch(new RushBuilding(building))
      .subscribe(() => {
        this.store.dispatch(new SpendGold(this.buildingRushCost(town, building, this.nextLevelForBuilding(town, building))));
      });
  }

  public upgradeBuildingFeature(town: GameTown, building: Building, feature: string): void {
    if (!this.canUpgradeBuildingFeature(town, building, feature)) { return; }

    this.store.dispatch(new UpgradeBuildingFeature(building, feature, this.buildingFeatureTime(building, feature)))
      .subscribe(() => {
        this.store.dispatch(new SpendGold(this.buildingFeatureCost(building, feature)));
      });
  }

  public rushBuildingFeature(town: GameTown, building: Building, feature: string): void {
    if (!this.canRushBuildingFeature(town, building, feature)) { return; }

    this.store.dispatch(new RushBuildingFeature(building, feature))
      .subscribe(() => {
        this.store.dispatch(new SpendGold(this.buildingFeatureRushCost(town, building, feature)));
      });
  }

  // guild hall functions
  public canRerollHeroes(town: GameTown): boolean {
    const cost = this.heroRerollCost(town);
    return town.gold >= cost;
  }

  public heroRerollCost(town: GameTown): bigint {
    return BigInt(town.buildings[Building.GuildHall].level * 100);
  }

  public rerollProspectiveHeroes(town: GameTown, doesCost = true): void {
    if (doesCost) {
      if (!this.canRerollHeroes(town)) { return; }

      const cost = this.heroRerollCost(town);
      this.store.dispatch(new SpendGold(cost));
    }

    this.store.dispatch(new RerollHeroes());
  }

  public canRecruitHero(town: GameTown, prosHero: ProspectiveHero): boolean {
    return town.gold >= prosHero.cost;
  }

  public recruitHero(town: GameTown, prosHero: ProspectiveHero): void {
    if (!this.canRecruitHero(town, prosHero)) { return; }

    this.store.dispatch(new HeroRecruit(prosHero)).subscribe(() => {
      this.store.dispatch(new SpendGold(prosHero.cost));
    });
  }

  public canTrainHero(town: GameTown, hero: Hero): boolean {
    if (!hero) { return false; }

    if (hero.onAdventure) { return false; }

    if (hero.stats[HeroStat.LVL] >= town.buildings[Building.GuildHall].level) { return false; }

    const cost = this.heroCreator.heroTrainCost(town, hero);
    if (town.gold < cost) { return false; }

    return true;
  }

  public trainHero(town: GameTown, hero: Hero): void {
    if (!this.canTrainHero(town, hero)) { return; }

    const expNeeded = hero.stats[HeroStat.EXP] - getCurrentStat(hero, HeroStat.EXP);
    const cost = this.heroCreator.heroTrainCost(town, hero);

    this.store.dispatch(new HeroGainEXP(hero.uuid, expNeeded))
      .subscribe(() => {
        this.store.dispatch(new SpendGold(cost));
      });
  }

  public cancelHeroDismiss(hero: Hero): void {
    this.store.dispatch(new HeroQueueDismissCancel(hero.uuid));
  }

  public dismissHero(town: GameTown, hero: Hero): void {
    if (hero.onAdventure) {
      this.store.dispatch(new HeroQueueDismiss(hero.uuid));
      return;
    }

    this.store.dispatch(new HeroDismiss(hero.uuid));
  }

  // cave functions
  public canRerollAdventures(town: GameTown): boolean {
    const cost = this.adventureRerollCost(town);
    return town.gold >= cost;
  }

  public adventureRerollCost(town: GameTown): bigint {
    return BigInt(town.buildings[Building.Cave].level * 100);
  }

  public rerollAdventures(town: GameTown, doesCost = true): void {
    if (doesCost) {
      if (!this.canRerollAdventures(town)) { return; }

      const cost = this.adventureRerollCost(town);
      this.store.dispatch(new SpendGold(cost));
    }

    this.store.dispatch(new RerollAdventures());
  }

  public startAdventure(town: GameTown, adventure: Adventure): void {
    if (this.isStartingAdventure) { return; }

    const heroes = this.advCreator.pickHeroesForAdventure(town, adventure);
    if (heroes.length === 0) { return; }

    this.isStartingAdventure = true;

    this.store.dispatch(new StartAdventure(adventure, heroes))
      .pipe(delay(1000))
      .subscribe(() => {
        this.isStartingAdventure = false;
      });
  }

  // item functions
  public scrapItem(item: HeroItem): void {
    this.store.dispatch(new ScrapItem(item));
  }

  // retire functions
  public canRetireHero(hero: Hero): boolean {
    return !hero.queueRetired && !hero.queueDismissed && hero.trackedStats[HeroTrackedStat.EncountersSucceeded] >= 100;
  }

  public retireHero(hero: Hero): void {
    if (hero.onAdventure) {
      this.store.dispatch(new HeroQueueRetire(hero.uuid));
      return;
    }

    this.store.dispatch(new HeroRetire(hero.uuid));
  }

  public cancelHeroRetire(hero: Hero): void {
    this.store.dispatch(new HeroQueueRetireCancel(hero.uuid));
  }

  // worker allocation functions
  public allocateAllWorkersToBuilding(building: Building): void {
    this.store.dispatch(new AllocateAllToBuilding(building));
  }

  public allocateSomeWorkersToBuilding(building: Building, num: number): void {
    this.store.dispatch(new AllocateSomeToBuilding(building, num));
  }

  public unallocateAllWorkersFromBuilding(building: Building): void {
    this.store.dispatch(new UnallocateAllFromBuilding(building));
  }

  public changeAutoAllocateBuilding(building: Building | null): void {
    this.store.dispatch(new ChangeWorkerAutoAllocationBuilding(building));
  }

  // crystal allocation functions
  public getAvailableJobCrystals(town: GameTown, job: HeroJob): bigint {
    return town.stats[TownStat.Retires][job] - town.stats[TownStat.CrystalsSpent][job];
  }

  public upgradeJobCrystalStat(town: GameTown, job: HeroJob): void {
    if (this.getAvailableJobCrystals(town, job) <= 0) { return; }
    this.store.dispatch(new JobCrystalUpgradeStat(job));
  }

  // library functions
  public canRerollBooks(town: GameTown): boolean {
    const cost = this.bookRerollCost(town);
    return town.gold >= cost;
  }

  public bookRerollCost(town: GameTown): bigint {
    return BigInt(town.buildings[Building.Library].level * 100);
  }

  public rerollBooks(town: GameTown, doesCost = true): void {
    if (doesCost) {
      if (!this.canRerollBooks(town)) { return; }

      const cost = this.bookRerollCost(town);
      this.store.dispatch(new SpendGold(cost));
    }

    this.store.dispatch(new RerollBooks());
  }

  public canBuyBook(town: GameTown, book: SkillBook): boolean {
    if (town.ownedBooks.length >= calculateMaxOwnedBooks(town)) { return false; }
    return town.gold >= book.cost;
  }

  public buyBook(town: GameTown, book: SkillBook): void {
    if (!this.canBuyBook(town, book)) { return; }

    this.store.dispatch(new BookBuy(book)).subscribe(() => {
      this.store.dispatch(new SpendGold(book.cost));
    });
  }

  public destroySkill(book: SkillBook): void {
    this.store.dispatch(new BookDestroy(book.uuid));
  }

  public learnSkill(hero: Hero, book: SkillBook): void {
    this.store.dispatch(new HeroLearnSkill(hero.uuid, book.uuid));
  }

  public forgetSkill(hero: Hero, book: SkillBook): void {
    this.store.dispatch(new HeroForgetSkill(hero.uuid, book.uuid));
  }

}
