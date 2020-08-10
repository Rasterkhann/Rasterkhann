
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { Building, BuildingFeature, GameTown } from '../interfaces';
import { doesTownHaveFeature, featureByName } from '../helpers';
import { BuildingData } from '../static';
import {
  UpgradeBuilding, SpendGold, RushBuilding, UpgradeBuildingFeature, RushBuildingFeature,
  AllocateAllToBuilding, AllocateSomeToBuilding, UnallocateAllFromBuilding,
  ChangeWorkerAutoAllocationBuilding
} from '../actions';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private store: Store) { }

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
}
