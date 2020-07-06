import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Hero, IGameTown, HeroStat } from '../../../interfaces';
import { GameService } from '../../../services/game.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit {

  @Input() town: IGameTown;
  @Input() hero: Hero;
  @Input() rating?: number;
  @Input() cost?: bigint;
  @Input() canBuyHero?: boolean;

  public readonly statOrder: HeroStat[] = [
    HeroStat.HP, HeroStat.SP, HeroStat.STA,
    HeroStat.ATK, HeroStat.DEF, HeroStat.GOLD
  ];

  public get stars(): string[] {
    if (!this.rating) { return []; }

    const base = Array(this.numStars).fill('star');
    if (this.hasHalfStar) { base.push('star-half'); }
    if (base.length === 0) { base.push('star-half'); }
    return base;
  }

  private get numStars(): number {
    if (!this.rating) { return 0; }
    return Math.floor(this.rating);
  }

  private get hasHalfStar(): boolean {
    if (!this.rating) { return false; }
    return this.rating - this.numStars >= 0.5;
  }

  constructor(private alert: AlertController, private game: GameService) { }

  ngOnInit(): void {}

  public getStat(stat: HeroStat): number {
    return this.hero.stats[stat];
  }

  async recruit(): Promise<void> {

    const alert = await this.alert.create({
      header: 'Recruit Hero',
      message: `Are you sure you want to recruit ${this.hero.name}, the level ${this.hero.stats[HeroStat.LVL]} ${this.hero.job}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes, Recruit',
          handler: async () => {
            if (!this.rating || !this.cost) { return; }
            this.game.recruitHero(this.town, { hero: this.hero, cost: this.cost, rating: this.rating });
          }
        }
      ]
    });

    await alert.present();
  }
}
