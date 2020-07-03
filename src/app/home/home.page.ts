import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';

import { GameService } from '../game.service';
import { GameState } from '../states';
import { IGameTown, ProspectiveHero, Adventure } from '../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @Select(GameState.currentTown) currentTown$: Observable<IGameTown>;
  @Select(GameState.currentTownProspectiveHeroes) prospectiveHeroes$: Observable<ProspectiveHero[]>;
  @Select(GameState.currentTownPotentialAdventures) potentialAdventures$: Observable<Adventure[]>;

  constructor(public game: GameService) {}

  ngOnInit(): void {
    // if we have no potential heroes, let's add some
    forkJoin({
      town: this.currentTown$.pipe(first()),
      heroes: this.prospectiveHeroes$.pipe(first())
    }).subscribe(({ town, heroes }) => {
      if (heroes && heroes.length > 0) { return; }

      this.game.rerollProspectiveHeroes(town, false);
    });

    // if we have no potential adventures, let's add some
    forkJoin({
      town: this.currentTown$.pipe(first()),
      adventures: this.potentialAdventures$.pipe(first())
    }).subscribe(({ town, adventures }) => {
      if (adventures && adventures.length > 0) { return; }

      this.game.rerollAdventures(town, false);
    });
  }

}
