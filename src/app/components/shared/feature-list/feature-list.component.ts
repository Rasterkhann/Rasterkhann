import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { GameService } from '../../../services/game.service';
import { GameTown, Building, BuildingFeature } from '../../../interfaces';
import { visibleBuildingFeatures, doesTownHaveFeature } from '../../../helpers';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureListComponent implements OnInit {

  @Input() town: GameTown;
  @Input() buildingId: Building;

  public get allVisibleFeatures(): BuildingFeature[] {
    return visibleBuildingFeatures(this.town, this.buildingId);
  }

  public get areAllUpgradesOwned(): boolean {
    return this.allVisibleFeatures.every(feat => doesTownHaveFeature(this.town, feat.name));
  }

  constructor(public game: GameService) { }

  ngOnInit(): void {}

}
