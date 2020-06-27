import { Component, OnInit, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GameState } from '../../states';
import { IGameTown } from '../../interfaces';

@Component({
  selector: 'app-current-town',
  templateUrl: './current-town.component.html',
  styleUrls: ['./current-town.component.scss'],
})
export class CurrentTownComponent implements OnInit {

  @Input() public town: IGameTown;

  @Select(GameState.currentTownGoldGain) currentTownGoldGain$: Observable<bigint>;

  constructor() { }

  ngOnInit() { }

}
