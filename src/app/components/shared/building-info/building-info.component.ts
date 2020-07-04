import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { IGameTown, Building } from '../../../interfaces';
import { GameService } from '../../../services/game.service';
import { BuildingData } from '../../../static';

@Component({
  selector: 'app-building-info',
  templateUrl: './building-info.component.html',
  styleUrls: ['./building-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingInfoComponent implements OnInit {

  @Input() town: IGameTown;
  @Input() buildingId: Building;

  public get buildingName(): string {
    return BuildingData[this.buildingId].name;
  }

  public get buildingDescription(): string {
    return BuildingData[this.buildingId].description;
  }

  constructor(public game: GameService) { }

  ngOnInit(): void {}

  public isBuildingAvailable(): boolean {
    const building = this.buildingId;

    if (this.town.buildings[building].level > 0) { return true; }
    if (!BuildingData[building].requires) { return true; }

    const requiredBuildings = BuildingData[building].requires || {};

    return Object.keys(requiredBuildings)
      .every((x: Building) => this.town.buildings[x].level >= (requiredBuildings[x] || 0));
  }

  public goToBuilding(): void {
    const building = this.buildingId;

    if (!this.town.buildings[building]) { return; }
    this.game.changeInfo(building);
  }

  public build(): void {
    const building = this.buildingId;

    this.game.upgradeBuilding(this.town, building);
  }

}
