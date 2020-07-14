import { Component, OnInit, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { IGameTown } from '../../interfaces';
import { GameState } from '../../states';

@Component({
  selector: 'app-current-info',
  templateUrl: './current-info.component.html',
  styleUrls: ['./current-info.component.scss'],
})
export class CurrentInfoComponent implements OnInit {

  @Input() public town: IGameTown;

  @Select(GameState.currentInfoWindow) currentInfo$: Observable<{ window: string, autoOpen: boolean }>;

  constructor() { }

  ngOnInit(): void {}

}
