import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../../interfaces';
import { GameService } from '../../../services/game.service';
import { BuildingData } from '../../../static';

@Component({
  selector: 'app-townhall',
  templateUrl: './townhall.component.html',
  styleUrls: ['./townhall.component.scss'],
})
export class TownHallComponent implements OnInit {

  @Input() town: IGameTown;

  public allBuildingKeys = Object.keys(BuildingData);

  constructor(public game: GameService) { }

  ngOnInit(): void {}

}
