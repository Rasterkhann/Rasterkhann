import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Select } from '@ngxs/store';

import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { HeroService } from '../../../../hero.service';
import { GameState } from '../../../../states';
import { ProspectiveHero, Hero, IGameTown } from '../../../../interfaces';
import { GameService } from '../../../../game.service';

@Component({
  selector: 'app-guild-modal',
  templateUrl: './guild-modal.component.html',
  styleUrls: ['./guild-modal.component.scss'],
})
export class GuildModalComponent implements OnDestroy, OnInit {

  @Select(GameState.currentTownProspectiveHeroes) prospectiveHeroes$: Observable<ProspectiveHero[]>;
  @Select(GameState.currentTownRecruitedHeroes) recruitedHeroes$: Observable<Hero[]>;

  @Input() public town: IGameTown;

  public recruitedHeroes: Hero[] = [];
  public prospectiveHeroes: ProspectiveHero[] = [];

  private recruitedHeroes$$: Subscription;
  private prospectiveHeroes$$: Subscription;

  constructor(private modalCtrl: ModalController, public game: GameService, private heroCreator: HeroService) { }

  ngOnInit(): void {
    console.log(this.heroCreator.generateProspectiveHero(this.town))
    this.prospectiveHeroes$$ = this.prospectiveHeroes$.subscribe(d => {
      this.prospectiveHeroes = d || [];
    });

    this.recruitedHeroes$$ = this.recruitedHeroes$.subscribe(d => {
      this.recruitedHeroes = d || [];
    });

    // if we have no potential heroes, let's add some
    this.prospectiveHeroes$.pipe(first()).subscribe(d => {
      if (d) { return; }

      this.game.rerollProspectiveHeroes(this.town, false);
    });
  }

  ngOnDestroy(): void {
    if (this.prospectiveHeroes$$) { this.prospectiveHeroes$$.unsubscribe(); }
    if (this.recruitedHeroes$$) { this.recruitedHeroes$$.unsubscribe(); }
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

}
