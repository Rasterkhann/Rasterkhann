import { Component, OnInit, Input } from '@angular/core';

import { GameService } from '../../../game.service';
import { IGameTown, Building, BuildingData, BuildingFeature } from '../../../interfaces';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
})
export class FeatureListComponent implements OnInit {

  @Input() town: IGameTown;
  @Input() buildingId: Building;

  public get allFeatures(): BuildingFeature[] {
    return BuildingData[this.buildingId].features || [];
  }

  constructor(public game: GameService) { }

  ngOnInit(): void {}

  isFeatureAvailable(feature: BuildingFeature): boolean {
    return true;
  }

}
