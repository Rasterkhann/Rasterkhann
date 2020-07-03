import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Select } from '@ngxs/store';

import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { HeroService } from '../../../../hero.service';
import { GameState } from '../../../../states';
import { ProspectiveHero, Hero, IGameTown } from '../../../../interfaces';
import { GameService } from '../../../../game.service';
import { calculateProspectiveHeroMaxTotal } from '../../../../helpers';

@Component({
  selector: 'app-guild-modal',
  templateUrl: './guild-modal.component.html',
  styleUrls: ['./guild-modal.component.scss'],
})
export class GuildModalComponent implements OnDestroy, OnInit {

  @Select(GameState.currentTownProspectiveHeroes) prospectiveHeroes$: Observable<ProspectiveHero[]>;
  @Select(GameState.currentTownRecruitedHeroes) recruitedHeroes$: Observable<Hero[]>;

  @Input() public town: IGameTown;

  private canBuyHeroes: boolean;
  private activeHeroes$: Subscription;

  constructor(private modalCtrl: ModalController, public game: GameService, private heroCreator: HeroService) { }

  ngOnInit(): void {

    // if we have no potential heroes, let's add some
    this.prospectiveHeroes$.pipe(first()).subscribe(d => {
      if (d && d.length > 0) { return; }

      this.game.rerollProspectiveHeroes(this.town, false);
    });

    this.activeHeroes$ = this.recruitedHeroes$.subscribe(d => {
      this.canBuyHeroes = d.length < calculateProspectiveHeroMaxTotal(this.town);
    });
  }

  ngOnDestroy(): void {
    if (this.activeHeroes$) { this.activeHeroes$.unsubscribe(); }
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  canHeroBeBought(prosHero: ProspectiveHero): boolean {
    return this.town.gold > prosHero.cost && this.canBuyHeroes;
  }

}
