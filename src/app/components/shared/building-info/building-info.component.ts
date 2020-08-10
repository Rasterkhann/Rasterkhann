import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GameTown, Building, GameOption } from '../../../interfaces';
import { GameService } from '../../../services';
import { BuildingData } from '../../../static';
import { ModalController } from '@ionic/angular';
import { WorkerAllocationModalComponent } from './allocation-modal/allocation-modal.component';

@Component({
  selector: 'app-building-info',
  templateUrl: './building-info.component.html',
  styleUrls: ['./building-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingInfoComponent implements OnInit {

  @Input() town: GameTown;
  @Input() buildingId: Building;

  @Select((state: any) => state.gamestate.options[GameOption.ShowHelpText]) showHelpText$: Observable<boolean>;

  public get buildingName(): string {
    return BuildingData[this.buildingId].name;
  }

  public get buildingDescription(): string {
    return BuildingData[this.buildingId].description;
  }

  constructor(private modal: ModalController, public game: GameService) { }

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

    if (this.town.buildings[building].level === 0) { return; }
    this.game.changeInfo(building);
  }

  public build(): void {
    const building = this.buildingId;

    this.game.upgradeBuilding(this.town, building);
  }

  public rush(): void {
    const building = this.buildingId;

    this.game.rushBuilding(this.town, building);
  }

  async openAllocationWindow(): Promise<void> {
    const modal = await this.modal.create({
      component: WorkerAllocationModalComponent,
      componentProps: {
        buildingId: this.buildingId
      }
    });

    await modal.present();
  }

}
