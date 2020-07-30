import { Component, OnInit, Input } from '@angular/core';
import { GameTown } from '../../../interfaces';
import { GameService } from '../../../services/game.service';
import { BuildingData } from '../../../static';

@Component({
  selector: 'app-townhall',
  templateUrl: './townhall.component.html',
  styleUrls: ['./townhall.component.scss'],
})
export class TownHallComponent implements OnInit {

  @Input() town: GameTown;

  public allBuildingKeys = Object.keys(BuildingData);

  constructor(public game: GameService) { }

  ngOnInit(): void {}

}
