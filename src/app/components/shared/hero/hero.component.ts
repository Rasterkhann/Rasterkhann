import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Hero, IGameTown } from '../../../interfaces';
import { GameService } from '../../../game.service';
import { calculateProspectiveHeroMaxTotal } from '../../../helpers';

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

  public get stars(): string[] {
    if (!this.rating) { return []; }

    const base = Array(this.numStars).fill('star');
    if (this.hasHalfStar) { base.push('star-half'); }
    if (base.length === 0) { base.push('star-half'); }
    return base;
  }

  private get numStars(): number {
    return Math.floor(this.rating);
  }

  private get hasHalfStar(): boolean {
    return this.rating - this.numStars >= 0.5;
  }

  constructor(private game: GameService) { }

  ngOnInit(): void {}

  recruit(): void {
    this.game.recruitHero(this.town, { hero: this.hero, cost: this.cost, rating: this.rating });
  }

  dismiss(): void {
    this.game.dismissHero(this.town, this.hero);
  }
}
