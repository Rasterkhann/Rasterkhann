import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { Select } from '@ngxs/store';

import { Observable, Subscription } from 'rxjs';

import { GameState } from '../../../../states';
import { ProspectiveHero, Hero, IGameTown, HeroStat, Trait } from '../../../../interfaces';
import { GameService } from '../../../../services/game.service';
import { calculateProspectiveHeroMaxTotal } from '../../../../helpers';
import { TraitEffects } from '../../../../static';

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

  public viewingHero: Hero | null;

  constructor(private modal: ModalController, private alert: AlertController, public game: GameService) { }

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

  getTraitData(trait: Trait): string {
    return TraitEffects[trait].description;
  }

  dismissCurrentHero(): void {
    if (!this.viewingHero) { return; }
    this.dismissHero(this.viewingHero);
  }

  async dismissHero(hero: Hero): Promise<void> {
    const alert = await this.alert.create({
      header: 'Dismiss Hero',
      message: `Are you sure you want to dismiss ${hero.name}, the level ${hero.stats[HeroStat.LVL]} ${hero.job}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes, Dismiss',
          handler: async () => {
            this.game.dismissHero(this.town, hero);
            this.viewingHero = null;
          }
        }
      ]
    });

    await alert.present();
  }

}
