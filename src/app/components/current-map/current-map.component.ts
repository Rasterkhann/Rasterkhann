import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../states/gamestate';

@Component({
  selector: 'app-current-map',
  templateUrl: './current-map.component.html',
  styleUrls: ['./current-map.component.scss'],
})
export class CurrentMapComponent implements OnInit {

  @Input() public town: IGameTown;

  constructor() { }

  ngOnInit() {}

}
