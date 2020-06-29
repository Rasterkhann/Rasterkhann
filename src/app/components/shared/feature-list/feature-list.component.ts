import { Component, OnInit, Input } from '@angular/core';

import { GameService } from '../../../game.service';
import { IGameTown, Building } from '../../../interfaces';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
})
export class FeatureListComponent implements OnInit {

  @Input() town: IGameTown;
  @Input() buildingId: Building;

  constructor(public game: GameService) { }

  ngOnInit() {}

  // upgradeBuildingFeature(building, feature);

}
