import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { Select } from '@ngxs/store';

import { Observable, Subscription } from 'rxjs';

import { GameState } from '../../../../states';
import { ProspectiveHero, Hero, IGameTown, HeroStat, Trait, ItemType, HeroItem } from '../../../../interfaces';
import { GameService } from '../../../../services/game.service';
import { calculateProspectiveHeroMaxTotal } from '../../../../helpers';
import { TraitEffects } from '../../../../static';
import { HeroService } from '../../../../services/hero.service';

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

  public get itemTypes(): ItemType[] {
    return [ItemType.Weapon, ItemType.Armor, ItemType.Potion];
  }

  public viewingProspectiveHero: ProspectiveHero | null;
  public viewingHero: Hero | null;

  constructor(
    private modal: ModalController,
    private alert: AlertController,
    public game: GameService,
    public heroCreator: HeroService
  ) { }

  ngOnInit(): void {
    this.activeHeroes$ = this.recruitedHeroes$.subscribe(d => {
      if (this.viewingProspectiveHero && this.viewingHero && d.map(h => h.uuid).includes(this.viewingHero.uuid)) {
        this.viewingProspectiveHero = null;
      }

      this.canBuyHeroes = d.length < calculateProspectiveHeroMaxTotal(this.town);

      d.forEach(h => {
        if (!this.viewingHero || h.uuid !== this.viewingHero.uuid) { return; }
        this.viewingHero = h;
      });
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

  getHeroGearTypeItems(hero: Hero, type: ItemType): HeroItem[] {
    return hero.gear[type];
  }

  getTraitData(trait: Trait): string {
    return TraitEffects[trait].description;
  }

  dismissCurrentHero(): void {
    if (!this.viewingHero) { return; }
    this.dismissHero(this.viewingHero);
  }

  trainCurrentHero(): void {
    if (!this.viewingHero) { return; }
    this.trainHero(this.viewingHero);
  }

  recruitCurrentHero(): void {
    if (!this.viewingProspectiveHero || !this.viewingHero) { return; }
    this.recruitHero(this.viewingProspectiveHero);
  }

  canRecruitHero(town: IGameTown, prosHero: ProspectiveHero): boolean {
    return this.canBuyHeroes && this.game.canRecruitHero(town, prosHero);
  }

  async trainHero(hero: Hero): Promise<void> {
    const cost = this.heroCreator.heroTrainCost(this.town, hero);

    // TODO: import bignum pipe (to game service) and format cost
    const alert = await this.alert.create({
      header: 'Train Hero',
      message: `Are you sure you want to train ${hero.name} to the level ${hero.stats[HeroStat.LVL] + 1} ${hero.job}?
       It will cost ${cost} gold.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes, Train',
          handler: async () => {
            this.game.trainHero(this.town, hero);
          }
        }
      ]
    });

    await alert.present();
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

  async recruitHero(prosHero: ProspectiveHero): Promise<void> {
    const alert = await this.alert.create({
      header: 'Recruit Hero',
      message: `Are you sure you want to recruit ${prosHero.hero.name}, the level ${prosHero.hero.stats[HeroStat.LVL]} ${prosHero.hero.job}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes, Recruit',
          handler: async () => {
            if (!prosHero.rating || !prosHero.cost) { return; }
            this.game.recruitHero(this.town, prosHero);
          }
        }
      ]
    });

    await alert.present();
  }

  unviewHero(): void {
    this.viewingHero = null;
    this.viewingProspectiveHero = null;
  }

  viewHero(hero: Hero): void {
    this.viewingHero = hero;
  }

  viewProspectiveHero(prosHero: ProspectiveHero): void {
    this.viewingHero = prosHero.hero;
    this.viewingProspectiveHero = prosHero;
  }

}
