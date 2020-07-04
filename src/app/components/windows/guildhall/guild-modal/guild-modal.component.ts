import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Select } from '@ngxs/store';

import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { HeroService } from '../../../../services/hero.service';
import { GameState } from '../../../../states';
import { ProspectiveHero, Hero, IGameTown } from '../../../../interfaces';
import { GameService } from '../../../../services/game.service';
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

  constructor(private modal: ModalController, public game: GameService) { }

  ngOnInit(): void {
    this.activeHeroes$ = this.recruitedHeroes$.subscribe(d => {
      this.canBuyHeroes = d.length < calculateProspectiveHeroMaxTotal(this.town);
    });
  }

  ngOnDestroy(): void {
    if (this.activeHeroes$) { this.activeHeroes$.unsubscribe(); }
  }

  dismiss(): void {
    this.modal.dismiss();
  }

  canHeroBeBought(prosHero: ProspectiveHero): boolean {
    return this.town.gold > prosHero.cost && this.canBuyHeroes;
  }

}
