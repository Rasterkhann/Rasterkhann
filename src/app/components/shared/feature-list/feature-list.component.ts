import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { GameService } from '../../../game.service';
import { IGameTown, Building, BuildingFeature } from '../../../interfaces';
import { BuildingData } from '../../../static';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureListComponent implements OnInit {

  @Input() town: IGameTown;
  @Input() buildingId: Building;

  public get allFeatures(): BuildingFeature[] {
    return Object.values(BuildingData[this.buildingId].features || {})
      .filter(feature => this.game.canSeeBuildingFeature(this.town, this.buildingId, feature.name));
  }

  constructor(public game: GameService) { }

  ngOnInit(): void {}

}
