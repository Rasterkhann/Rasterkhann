import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, forkJoin, combineLatest, interval } from 'rxjs';
import { first, throttle } from 'rxjs/operators';
import { sample } from 'lodash';

import { GameService } from '../../services/game.service';
import { GameState } from '../../states';
import { IGameTown, ProspectiveHero, Adventure, GameOption, Building, IGameState } from '../../interfaces';
import { getCurrentTownFromState, getCurrentTownCanDoAnyAdventures } from '../../helpers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @Select(GameState) state$: Observable<IGameState>;
  @Select(GameState.currentTown) currentTown$: Observable<IGameTown>;
  @Select(GameState.currentTownProspectiveHeroes) prospectiveHeroes$: Observable<ProspectiveHero[]>;
  @Select(GameState.currentTownPotentialAdventures) potentialAdventures$: Observable<Adventure[]>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationHeroes]) autoHeroes$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationBuildings]) autoBuildings$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationAdventures]) autoAdventures$: Observable<boolean>;

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

    this.watchAutomation();
  }

  private watchAutomation(): void {
    combineLatest([
      interval(5000),
      this.autoHeroes$,
      this.autoBuildings$,
      this.autoAdventures$
    ]).pipe(throttle(() => interval(5000))).subscribe(async ([_, ...opts]) => {
      const [heroes, buildings, adventures] = opts;
      const state = await this.state$.pipe(first()).toPromise();
      if (heroes)     { this.checkAutoHeroes(state); }
      if (buildings)  { this.checkAutoBuildings(state); }
      if (adventures) { this.checkAutoAdventures(state); }
    });
  }

  private checkAutoHeroes(state: IGameState): void {
    const town = getCurrentTownFromState(state);
    const trainableHeroes = town.recruitedHeroes.filter(h => this.game.canTrainHero(town, h));
    const chosenHero = sample(trainableHeroes);
    if (!chosenHero) { return; }

    this.game.trainHero(town, chosenHero);
  }

  private checkAutoBuildings(state: IGameState): void {
    const town = getCurrentTownFromState(state);
    const upgradeableBuildings = Object.values(Building).filter(b => this.game.canUpgradeBuilding(town, b) && town.buildings[b].level > 0);
    const chosenBuilding = sample(upgradeableBuildings);
    if (!chosenBuilding) { return; }

    this.game.upgradeBuilding(town, chosenBuilding);
  }

  private checkAutoAdventures(state: IGameState): void {
    const town = getCurrentTownFromState(state);

    const canDoAdventure = getCurrentTownCanDoAnyAdventures(state);
    if (!canDoAdventure) { return; }

    const chosenAdventure = sample(town.potentialAdventures);
    if (!chosenAdventure) { return; }

    this.game.startAdventure(town, chosenAdventure);
  }

}
