import { Component, OnInit, Input } from '@angular/core';

import { IGameTown, Building } from '../../interfaces';
import { GameService } from '../../game.service';

const pos = (x: number) => x * 16;

@Component({
  selector: 'app-current-map',
  templateUrl: './current-map.component.html',
  styleUrls: ['./current-map.component.scss'],
})
export class CurrentMapComponent implements OnInit {

  public buildingData: Record<Building, { x: number, y: number, position: string, width?: number, height?: number }> = {
    [Building.TownHall]: { x: pos(17), y: pos(19), position: '0px 0px',     width: 48, height: 32 },
    [Building.House]:    { x: pos(13), y: pos(23), position: '-32px -48px' }
  };

  @Input() public town: IGameTown;

  public get availableBuildings(): Building[] {
    return Object.keys(this.town.buildings || {}) as Building[];
  }

  constructor(public game: GameService) { }

  ngOnInit() {}

}
