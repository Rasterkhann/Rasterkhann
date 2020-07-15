import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { GameService } from '../../../services/game.service';
import { IGameTown, Building, BuildingFeature } from '../../../interfaces';
import { visibleBuildingFeatures } from '../../../helpers';

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
    return visibleBuildingFeatures(this.town, this.buildingId);
  }

  constructor(public game: GameService) { }

  ngOnInit(): void {}

}
