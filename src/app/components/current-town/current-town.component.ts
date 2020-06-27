import { Component, OnInit, Input } from '@angular/core';

import { IGameTown } from '../../states/gamestate';

@Component({
  selector: 'app-current-town',
  templateUrl: './current-town.component.html',
  styleUrls: ['./current-town.component.scss'],
})
export class CurrentTownComponent implements OnInit {

  @Input() public town: IGameTown;

  constructor() { }

  ngOnInit() { }

}
