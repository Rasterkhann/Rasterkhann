
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { timer } from 'rxjs';

import { ChooseInfo, GameLoop, SpendGold, UpgradeBuilding, LoadSaveData,
  OptionToggleUpgradeVisibility, UpgradeBuildingFeature, RerollHeroes, RecruitHero, DismissHero, RerollAdventures } from '../actions';
import { Building, IGameTown, IGameState, BuildingFeature, Hero, ProspectiveHero } from '../interfaces';
import { doesTownHaveFeature } from '../helpers';
import { BuildingData } from '../static';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private store: Store) {
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
  public changeInfo(newWindow: string): void {
    if (!newWindow) { return; }
    this.store.dispatch(new ChooseInfo(newWindow));
  }

  public loadState(state: IGameState): void {
    this.store.dispatch(new LoadSaveData(state));
  }

  public toggleUpgradeVisibility(): void {
    this.store.dispatch(new OptionToggleUpgradeVisibility());
  }

  // building functions
  public featureByName(building: Building, feature: string): BuildingFeature {
    return BuildingData[building].features[feature];
  }

  public doesTownHaveFeature(town: IGameTown, feature: string): boolean {
    return doesTownHaveFeature(town, feature);
  }

  public buildingCost(building: Building, level = 1): bigint {
    return BuildingData[building].levelCost(level);
  }

  public buildingFeatureCost(building: Building, feature: string): bigint {
    return this.featureByName(building, feature).cost;
  }

  public buildingFeatureTime(building: Building, feature: string): number {
    return this.featureByName(building, feature).upgradeTime;
  }

  public canSeeBuildingFeature(town: IGameTown, building: Building, feature: string): boolean {
    const featureRef: BuildingFeature = this.featureByName(building, feature);
    if (!featureRef) { return false; }

    if (this.doesTownHaveFeature(town, feature)) { return false; }

    if (featureRef.requiresLevel && town.buildings[building].level < featureRef.requiresLevel) { return false; }

    if (featureRef.requiresFeature) {
      const allPreFeatures = Object.keys(featureRef.requiresFeature)
        .every(feat => town.buildings[building].features && town.buildings[building].features[feat]);
      if (!allPreFeatures) { return false; }
    }

    return true;
  }

  public nextLevelForBuilding(town: IGameTown, building: Building): number {
    return town.buildings[building] ? town.buildings[building].level + 1 : 1;
  }

  public canUpgradeBuilding(town: IGameTown, building: Building): boolean {
    if (town.buildings[building]) {
      const isConstructing = town.buildings[building].constructionDoneAt;
      if (isConstructing) { return false; }
    }

    const nextLevelCost = this.buildingCost(building, this.nextLevelForBuilding(town, building));
    if (nextLevelCost === 0n) { return false; }

    return town.gold >= nextLevelCost;
  }

  public canUpgradeBuildingFeature(town: IGameTown, building: Building, feature: string): boolean {
    if (town.buildings[building].featureConstruction) {
      const isConstructing = town.buildings[building].featureConstruction[feature];
      if (isConstructing) { return false; }
    }

    const nextLevelCost = this.buildingFeatureCost(building, feature);
    if (nextLevelCost === 0n) { return false; }

    return this.canSeeBuildingFeature(town, building, feature) && town.gold >= nextLevelCost;
  }

  public upgradeBuilding(town: IGameTown, building: Building): void {
    if (!this.canUpgradeBuilding(town, building)) { return; }

    this.store.dispatch(new UpgradeBuilding(building))
      .subscribe(() => {
        this.store.dispatch(new SpendGold(this.buildingCost(building, this.nextLevelForBuilding(town, building))));
      });
  }

  public upgradeBuildingFeature(town: IGameTown, building: Building, feature: string): void {
    if (!this.canUpgradeBuildingFeature(town, building, feature)) { return; }

    this.store.dispatch(new UpgradeBuildingFeature(building, feature, this.buildingFeatureTime(building, feature)))
      .subscribe(() => {
        this.store.dispatch(new SpendGold(this.buildingFeatureCost(building, feature)));
      });
  }

  // guild hall functions
  public heroRerollCost(town: IGameTown): bigint {
    return BigInt(town.buildings[Building.GuildHall].level * 100);
  }

  public rerollProspectiveHeroes(town: IGameTown, doesCost = true): void {
    if (doesCost) {
      const cost = this.heroRerollCost(town);
      if (town.gold < cost) { return; }

      this.store.dispatch(new SpendGold(cost));
    }

    this.store.dispatch(new RerollHeroes());
  }

  public recruitHero(town: IGameTown, prosHero: ProspectiveHero): void {
    if (town.gold < prosHero.cost) { return; }

    this.store.dispatch(new RecruitHero(prosHero)).subscribe(() => {
      this.store.dispatch(new SpendGold(prosHero.cost));
    });
  }

  public dismissHero(town: IGameTown, hero: Hero): void {
    this.store.dispatch(new DismissHero(hero));
  }

  // cave functions
  public adventureRerollCost(town: IGameTown): bigint {
    return BigInt(town.buildings[Building.Cave].level * 100);
  }

  public rerollAdventures(town: IGameTown, doesCost = true): void {
    if (doesCost) {
      const cost = this.adventureRerollCost(town);
      if (town.gold < cost) { return; }

      this.store.dispatch(new SpendGold(cost));
    }

    this.store.dispatch(new RerollAdventures());
  }

}
