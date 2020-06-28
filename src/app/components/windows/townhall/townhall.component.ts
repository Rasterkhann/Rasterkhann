import { Component, OnInit, Input } from '@angular/core';
import { IGameTown, BuildingData, Building } from '../../../interfaces';
import { GameService } from '../../../game.service';

@Component({
  selector: 'app-townhall',
  templateUrl: './townhall.component.html',
  styleUrls: ['./townhall.component.scss'],
})
export class TownHallComponent implements OnInit {

  @Input() town: IGameTown;

  public allBuildingInfos = Object.keys(BuildingData).map(x => ({ id: x, ...BuildingData[x] }));

  constructor(public game: GameService) { }

  ngOnInit() {}

  public isBuildingAvailable(building: Building) {
    if (this.town.buildings[building]) { return true; }
    if (!BuildingData[building].requires) { return true; }

    return Object.keys(BuildingData[building].requires)
      .every(x => this.town.buildings[x]
               && this.town.buildings[x].level >= BuildingData[building].requires[x]);
  }

  public goToBuilding(building: Building) {
    if (!this.town.buildings[building]) { return; }
    this.game.changeInfo(building);
  }

  public build(building: Building) {
    this.game.upgradeBuilding(this.town, building);
  }

}
