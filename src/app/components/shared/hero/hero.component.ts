import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Hero, IGameTown, HeroStat } from '../../../interfaces';
import { canHeroGoOnAdventure } from '../../../helpers';

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
  @Input() showTraits?: boolean;

  public readonly topStats: HeroStat[] = [
    HeroStat.HP, HeroStat.SP, HeroStat.STA
  ];

  public readonly bottomStats: HeroStat[] = [
    HeroStat.ATK, HeroStat.DEF, HeroStat.GOLD
  ];

  public get status(): string {
    if (this.hero.onAdventure)            { return 'Adventuring'; }
    if (!canHeroGoOnAdventure(this.hero)) { return 'Resting'; }
    return 'Idle';
  }

  public get stars(): string[] {
    if (!this.rating) { return []; }

    const stars = Math.max(this.numStars, 0);

    const base = Array(stars).fill('star');
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

  constructor() { }

  ngOnInit(): void {}

  public getTotalStat(stat: HeroStat): number {
    return this.hero.stats[stat];
  }

  public getStat(stat: HeroStat): number {
    return this.hero.currentStats[stat];
  }
}
