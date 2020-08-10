import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { delay } from 'rxjs/operators';

import { GameTown, Building, Adventure } from '../interfaces';
import { SpendGold, RerollAdventures, StartAdventure } from '../actions';
import { AdventureService } from './adventure.service';

@Injectable({
  providedIn: 'root'
})
export class CaveService {

  private isStartingAdventure: boolean;

  constructor(private store: Store, private advCreator: AdventureService) {}

  public canRerollAdventures(town: GameTown): boolean {
    const cost = this.adventureRerollCost(town);
    return town.gold >= cost;
  }

  public adventureRerollCost(town: GameTown): bigint {
    return BigInt(town.buildings[Building.Cave].level * 100);
  }

  public rerollAdventures(town: GameTown, doesCost = true): void {
    if (doesCost) {
      if (!this.canRerollAdventures(town)) { return; }

      const cost = this.adventureRerollCost(town);
      this.store.dispatch(new SpendGold(cost));
    }

    this.store.dispatch(new RerollAdventures());
  }

  public startAdventure(town: GameTown, adventure: Adventure): void {
    if (this.isStartingAdventure) { return; }

    const heroes = this.advCreator.pickHeroesForAdventure(town, adventure);
    if (heroes.length === 0) { return; }

    this.isStartingAdventure = true;

    this.store.dispatch(new StartAdventure(adventure, heroes))
      .pipe(delay(1000))
      .subscribe(() => {
        this.isStartingAdventure = false;
      });
  }
}
