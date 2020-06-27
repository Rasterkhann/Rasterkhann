import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GameService } from '../game.service';
import { GameState } from '../states';
import { IGameTown } from '../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @Select(GameState.currentTown) currentTown$: Observable<IGameTown>;

  constructor(public game: GameService) {}

}
