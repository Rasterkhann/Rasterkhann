
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { timer } from 'rxjs';

import { ChooseInfo, GameLoop, SpendGold, UpgradeBuilding, LoadSaveData } from './actions';
import { Building, BuildingData, IGameTown, IGameState } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private store: Store) {
    this.init();
  }

  private init() {
    this.startGameLoop();
  }

  private startGameLoop() {
    timer(0, 1000).subscribe(() => {
      this.store.dispatch(new GameLoop());
    });
  }

  // ui functions
  public changeInfo(newWindow: string) {
    if (!newWindow) { return; }
    this.store.dispatch(new ChooseInfo(newWindow));
  }

  public loadState(state: IGameState) {
    this.store.dispatch(new LoadSaveData(state));
  }

  // building functions
  public buildingCost(building: Building, level = 1): bigint {
    return BuildingData[building].levelCost(level);
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

  public upgradeBuilding(town: IGameTown, building: Building) {
    if (!this.canUpgradeBuilding(town, building)) { return; }

    this.store.dispatch(new SpendGold(this.buildingCost(building, this.nextLevelForBuilding(town, building))));
    this.store.dispatch(new UpgradeBuilding(building));
  }

}
