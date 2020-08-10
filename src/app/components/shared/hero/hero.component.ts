import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Hero, GameTown, HeroStat, Building } from '../../../interfaces';
import { canHeroGoOnAdventure } from '../../../helpers';
import { GameService } from '../../../services';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit {

  @Input() town: GameTown;
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
    if (this.hero.currentlyWorkingAt)     { return `Working at the ${this.hero.currentlyWorkingAt}`; }
    if (this.hero.onAdventure)            { return 'Adventuring'; }
    if (!canHeroGoOnAdventure(this.hero)) { return 'Resting'; }
    return 'Idle';
  }

  public get workingExplanation(): string {
    switch (this.hero.currentlyWorkingAt) {
      case Building.Alchemist: return 'Decreases potion production time by 50%';
      case Building.Armory:    return 'Decreases armor/weapon production time by 50%';
      case Building.Bazaar:    return 'Increases prices by 25%';
      case Building.Cave:      return 'Decreases adventure time by 25%';
      case Building.Inn:       return 'Increases cost by 25 and restfulness by 3';
      default:                 return '';
    }
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

  constructor(public game: GameService) { }

  ngOnInit(): void {}

  public getTotalStat(stat: HeroStat): number {
    return this.hero.stats[stat];
  }

  public getStat(stat: HeroStat): number {
    return this.hero.currentStats[stat];
  }
}
