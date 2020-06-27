
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { timer } from 'rxjs';

import { GainCurrentGold } from './actions';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private store: Store) {
    this.init();
  }

  private init() {
    this.startGameLoop();
  }

  private startGameLoop() {
    timer(0, 1000).subscribe(() => {
      this.store.dispatch(new GainCurrentGold());
    });
  }

}
