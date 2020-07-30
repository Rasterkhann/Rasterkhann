import { Component, OnInit, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GameState } from '../../states';
import { GameTown } from '../../interfaces';

@Component({
  selector: 'app-current-town',
  templateUrl: './current-town.component.html',
  styleUrls: ['./current-town.component.scss'],
})
export class CurrentTownComponent implements OnInit {

  @Input() public town: GameTown;

  @Select(GameState.currentTownGoldGain) currentTownGoldGain$: Observable<bigint>;

  constructor() { }

  ngOnInit(): void { }

}
