import { Component, OnInit, Input } from '@angular/core';
import { IGameTown, BuildingData } from '../../../interfaces';
import { GameService } from '../../../game.service';

@Component({
  selector: 'app-townhall',
  templateUrl: './townhall.component.html',
  styleUrls: ['./townhall.component.scss'],
})
export class TownHallComponent implements OnInit {

  @Input() town: IGameTown;

  public allBuildingKeys = Object.keys(BuildingData);

  constructor(public game: GameService) { }

  ngOnInit() {}

}
