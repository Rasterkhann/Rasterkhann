
import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AlertController } from '@ionic/angular';

import { timer, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import {
  ChooseInfo, GameLoop, LoadSaveData,
  OptionToggle
} from '../actions';
import { Building, GameTown, IGameState, BuildingFeature, Hero,
  ProspectiveHero, Adventure, GameOption, HeroItem, HeroJob, SkillBook } from '../interfaces';
import { LoggerService } from './logger.service';
import { BuildingService } from './building.service';
import { GuildHallService } from './guildhall.service';
import { CaveService } from './cave.service';
import { LibraryService } from './library.service';
import { AdventureService } from './adventure.service';
import { CrystalService } from './crystal.service';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  @Select((state: any) => state.gamestate.options[GameOption.ShowConfirmationDialogs]) confirmationDialogs$: Observable<boolean>;

  @Select((state: any) => state.gamestate.options[GameOption.ShowStatTooltips]) statTooltips$: Observable<boolean>;

  constructor(
    private alert: AlertController,
    private store: Store,

    private adventureService: AdventureService,
    private buildingService: BuildingService,
    private caveService: CaveService,
    private crystalService: CrystalService,
    private guildhallService: GuildHallService,
    private itemService: ItemService,
    private libraryService: LibraryService,

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
    this.store.dispatch(new LoadSaveData(state))
      .subscribe(() => {
        window.location.reload();
      });
  }

  public toggleOption(option: GameOption): void {
    this.store.dispatch(new OptionToggle(option));
  }

  public doSimpleConfirmation(
    { header, message, confirmText, showAlways }: { header: string, message: string, confirmText: string, showAlways?: boolean },
    finalize: () => void
  ): void {
    this.doConfirmation(
      { header, message, showAlways, buttons: [
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
    { header, message, buttons, showAlways }: { header: string, message: string, buttons: any[], showAlways?: boolean },
    finalize: () => void
  ): void {
    this.confirmationDialogs$.pipe(first())
      .subscribe(async showDialog => {
        if (!showAlways && !showDialog) {
          finalize();
          return;
        }

        const alert = await this.alert.create({ header, message, buttons });
        await alert.present();
      });
  }

  // building functions
  public featureByName(building: Building, feature: string): BuildingFeature {
    return this.buildingService.featureByName(building, feature);
  }

  public doesTownHaveFeature(town: GameTown, feature: string): boolean {
    return this.buildingService.doesTownHaveFeature(town, feature);
  }

  public buildingCost(building: Building, level = 1): bigint {
    return this.buildingService.buildingCost(building, level);
  }

  public buildingRushCost(town: GameTown, building: Building, level = 1): bigint {
    return this.buildingService.buildingRushCost(town, building, level);
  }

  public buildingFeatureCost(building: Building, feature: string): bigint {
    return this.buildingService.buildingFeatureCost(building, feature);
  }

  public buildingFeatureRushCost(town: GameTown, building: Building, feature: string): bigint {
    return this.buildingService.buildingFeatureRushCost(town, building, feature);
  }

  public buildingFeatureTime(building: Building, feature: string): number {
    return this.buildingService.buildingFeatureTime(building, feature);
  }

  public canSeeBuildingFeature(town: GameTown, building: Building, feature: string): boolean {
    return this.buildingService.canSeeBuildingFeature(town, building, feature);
  }

  public nextLevelForBuilding(town: GameTown, building: Building): number {
    return this.buildingService.nextLevelForBuilding(town, building);
  }

  public canUpgradeBuilding(town: GameTown, building: Building): boolean {
    return this.buildingService.canUpgradeBuilding(town, building);
  }

  public canRushBuilding(town: GameTown, building: Building): boolean {
    return this.buildingService.canRushBuilding(town, building);
  }

  public canSeeRushBuilding(town: GameTown, building: Building): boolean {
    return this.buildingService.canSeeRushBuilding(town, building);
  }

  public canUpgradeBuildingFeature(town: GameTown, building: Building, feature: string): boolean {
    return this.buildingService.canUpgradeBuildingFeature(town, building, feature);
  }

  public canRushBuildingFeature(town: GameTown, building: Building, feature: string): boolean {
    return this.buildingService.canRushBuildingFeature(town, building, feature);
  }

  public upgradeBuilding(town: GameTown, building: Building): void {
    return this.buildingService.upgradeBuilding(town, building);
  }

  public rushBuilding(town: GameTown, building: Building): void {
    return this.buildingService.rushBuilding(town, building);
  }

  public upgradeBuildingFeature(town: GameTown, building: Building, feature: string): void {
    return this.buildingService.upgradeBuildingFeature(town, building, feature);
  }

  public rushBuildingFeature(town: GameTown, building: Building, feature: string): void {
    return this.buildingService.rushBuildingFeature(town, building, feature);
  }

  // guild hall functions
  public canRerollHeroes(town: GameTown): boolean {
    return this.guildhallService.canRerollHeroes(town);
  }

  public heroRerollCost(town: GameTown): bigint {
    return this.guildhallService.heroRerollCost(town);
  }

  public rerollProspectiveHeroes(town: GameTown, doesCost = true): void {
    return this.guildhallService.rerollProspectiveHeroes(town, doesCost);
  }

  public canRecruitHero(town: GameTown, prosHero: ProspectiveHero): boolean {
    return this.guildhallService.canRecruitHero(town, prosHero);
  }

  public recruitHero(town: GameTown, prosHero: ProspectiveHero): void {
    return this.guildhallService.recruitHero(town, prosHero);
  }

  public canTrainHero(town: GameTown, hero: Hero): boolean {
    return this.guildhallService.canTrainHero(town, hero);
  }

  public trainHero(town: GameTown, hero: Hero): void {
    return this.guildhallService.trainHero(town, hero);
  }

  public cancelHeroDismiss(hero: Hero): void {
    return this.guildhallService.cancelHeroDismiss(hero);
  }

  public dismissHero(town: GameTown, hero: Hero): void {
    return this.guildhallService.dismissHero(town, hero);
  }

  public queueRecruit(prosHero: ProspectiveHero): void {
    return this.guildhallService.queueRecruit(prosHero);
  }

  public cancelQueueRecruit(prosHero: ProspectiveHero): void {
    return this.guildhallService.cancelQueueRecruit(prosHero);
  }

  public heroStatus(hero: Hero): string {
    return this.guildhallService.heroStatus(hero);
  }

  // cave functions
  public canRerollAdventures(town: GameTown): boolean {
    return this.caveService.canRerollAdventures(town);
  }

  public adventureRerollCost(town: GameTown): bigint {
    return this.caveService.adventureRerollCost(town);
  }

  public rerollAdventures(town: GameTown, doesCost = true): void {
    return this.caveService.rerollAdventures(town, doesCost);
  }

  public startAdventure(town: GameTown, adventure: Adventure): void {
    return this.caveService.startAdventure(town, adventure);
  }

  public startAdventureWithHeroes(town: GameTown, adventure: Adventure, heroes: Hero[]): void {
    return this.caveService.startAdventureWithHeroes(town, adventure, heroes);
  }

  public queueAdventureWithHeroes(town: GameTown, adventure: Adventure, heroes: Hero[]): void {
    return this.caveService.queueAdventureWithHeroes(town, adventure, heroes);
  }

  public doesTownHaveEnoughCrystalsForLegendaryAdventure(town: GameTown): boolean {
    return this.adventureService.doesTownHaveEnoughCrystalsForLegendaryAdventure(town);
  }

  public getLegendaryAdventureCost(town: GameTown): Record<HeroJob, number> {
    return this.adventureService.getLegendaryAdventureCost(town);
  }

  public generateLegendaryAdventure(town: GameTown): void {
    return this.caveService.generateLegendaryAdventure(town);
  }

  // item functions
  public scrapItem(item: HeroItem): void {
    return this.itemService.scrapItem(item);
  }

  public canAnyHeroesUseItem(town: GameTown, item: HeroItem): boolean {
    return this.itemService.canAnyHeroesUseItem(town, item);
  }

  // retire functions
  public canRetireHero(hero: Hero): boolean {
    return this.guildhallService.canRetireHero(hero);
  }

  public retireHero(hero: Hero): void {
    return this.guildhallService.retireHero(hero);
  }

  public cancelHeroRetire(hero: Hero): void {
    return this.guildhallService.cancelHeroRetire(hero);
  }

  // worker allocation functions
  public allocateAllWorkersToBuilding(building: Building): void {
    return this.buildingService.allocateAllWorkersToBuilding(building);
  }

  public allocateSomeWorkersToBuilding(building: Building, num: number): void {
    return this.buildingService.allocateSomeWorkersToBuilding(building, num);
  }

  public unallocateAllWorkersFromBuilding(building: Building): void {
    return this.buildingService.unallocateAllWorkersFromBuilding(building);
  }

  public changeAutoAllocateBuilding(building: Building | null): void {
    return this.buildingService.changeAutoAllocateBuilding(building);
  }

  // crystal allocation functions
  public getAvailableJobCrystals(town: GameTown, job: HeroJob): bigint {
    return this.crystalService.getAvailableJobCrystals(town, job);
  }

  public upgradeJobCrystalStat(town: GameTown, job: HeroJob): void {
    return this.crystalService.upgradeJobCrystalStat(town, job);
  }

  // library functions
  public canRerollBooks(town: GameTown): boolean {
    return this.libraryService.canRerollBooks(town);
  }

  public bookRerollCost(town: GameTown): bigint {
    return this.libraryService.bookRerollCost(town);
  }

  public rerollBooks(town: GameTown, doesCost = true): void {
    return this.libraryService.rerollBooks(town, doesCost);
  }

  public canBuyBook(town: GameTown, book: SkillBook): boolean {
    return this.libraryService.canBuyBook(town, book);
  }

  public buyBook(town: GameTown, book: SkillBook): void {
    return this.libraryService.buyBook(town, book);
  }

  public destroySkill(book: SkillBook): void {
    return this.libraryService.destroySkill(book);
  }

  public learnSkill(hero: Hero, book: SkillBook): void {
    return this.libraryService.learnSkill(hero, book);
  }

  public forgetSkill(hero: Hero, book: SkillBook): void {
    return this.libraryService.forgetSkill(hero, book);
  }

}
