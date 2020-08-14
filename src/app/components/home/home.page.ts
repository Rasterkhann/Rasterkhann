import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, combineLatest, interval } from 'rxjs';
import { first, switchMap, throttle } from 'rxjs/operators';
import { sample } from 'lodash';

import { GameService } from '../../services';
import { GameState } from '../../states';
import { GameTown, ProspectiveHero, Adventure, GameOption, Building,
  IGameState, ItemType, ItemPassedOverThreshold, SkillBook } from '../../interfaces';
import { getCurrentTownFromState, getCurrentTownCanDoAnyAdventures } from '../../helpers';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @Select(GameState) state$: Observable<IGameState>;
  @Select(GameState.currentTown) currentTown$: Observable<GameTown>;
  @Select(GameState.currentTownProspectiveHeroes) prospectiveHeroes$: Observable<ProspectiveHero[]>;
  @Select(GameState.currentTownPotentialAdventures) potentialAdventures$: Observable<Adventure[]>;
  @Select(GameState.currentTownProspectiveBooks) prospectiveBooks$: Observable<SkillBook[]>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationHeroes]) autoHeroes$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationBuildings]) autoBuildings$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationAdventures]) autoAdventures$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationScrap]) autoScrap$: Observable<boolean>;

  public hasUpdate: boolean;

  constructor(private http: HttpClient, public game: GameService) {}

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

    // if we have no potential books, let's add some
    forkJoin({
      town: this.currentTown$.pipe(first()),
      books: this.prospectiveBooks$.pipe(first())
    }).subscribe(({ town, books }) => {
      if (books && books.length > 0) { return; }

      this.game.rerollBooks(town, false);
    });

    this.watchVersion();
    this.watchAutomation();
  }

  public refresh(): void {
    window.location.reload();
  }

  private watchVersion(): void {
    // only do this in production and when the app is run in the browser
    if ((window as any).isDownloaded) { return; }
    if (!environment.production) { return; }

    // check for a new version every half-hour
    interval(environment.production ? 1800000 : 5000)
      .pipe(switchMap(() => this.http.get('https://api.github.com/repos/Rasterkhann/Rasterkhann/commits/main')))
      .subscribe(data => {
        if ((data as any).sha.startsWith(environment.version.revision)) { return; }
        this.hasUpdate = true;
      });
  }

  private watchAutomation(): void {
    combineLatest([
      interval(5000),
      this.autoHeroes$,
      this.autoBuildings$,
      this.autoAdventures$,
      this.autoScrap$
    ]).pipe(throttle(() => interval(5000))).subscribe(async ([_, ...opts]) => {
      const [heroes, buildings, adventures, scrap] = opts;
      const state = await this.state$.pipe(first()).toPromise();
      if (heroes)     { this.checkAutoHeroes(state); }
      if (buildings)  { this.checkAutoBuildings(state); }
      if (adventures) { this.checkAutoAdventures(state); }
      if (scrap)      { this.checkAutoScrap(state); }
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

  private checkAutoScrap(state: IGameState): void {
    const town = getCurrentTownFromState(state);

    const weapons = town.itemsForSale[ItemType.Weapon] || [];
    const armors = town.itemsForSale[ItemType.Armor] || [];

    const item = sample(weapons.concat(armors));
    if (item
    && (item.timesPassedOver > ItemPassedOverThreshold.AutoSellThreshold || !this.game.canAnyHeroesUseItem(town, item))) {
      this.game.scrapItem(item);
    }

  }

}
