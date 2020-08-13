import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { GameTown, Hero } from '../../../../interfaces';
import { GameState } from '../../../../states';
import { calculateMaxMembersPerTeam, canHeroGoOnAdventure } from '../../../../helpers';
import { GameService } from '../../../../services';

@Component({
  selector: 'app-legendary-hero-modal',
  templateUrl: './legendary-hero-modal.component.html',
  styleUrls: ['./legendary-hero-modal.component.scss'],
})
export class LegendaryHeroModalComponent implements OnInit, OnDestroy {

  @Select(GameState.currentTown) currentTown$: Observable<GameTown>;

  public town: GameTown;
  public heroes: Record<string, boolean> = {};

  private town$: Subscription;

  constructor(private modal: ModalController, public game: GameService) { }

  ngOnInit(): void {
    this.town$ = this.currentTown$.subscribe(t => {
      this.town = t;

      const checked: Record<string, boolean> = {};

      this.town.recruitedHeroes.forEach(h => {
        checked[h.uuid] = true;

        if (!canHeroGoOnAdventure(h) && this.heroes[h.uuid]) {
          this.heroes[h.uuid] = false;
        }
      });

      // if, for some reason, someone queues a dismiss then pops this window up, the hero should be removed from the list
      Object.keys(this.heroes).forEach(uuid => {
        if (checked[uuid]) { return; }
        this.heroes[uuid] = false;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.town$) { this.town$.unsubscribe(); }
  }

  dismiss(): void {
    this.modal.dismiss();
  }

  confirm(): void {
    const heroes = this.town.recruitedHeroes.filter(h => this.heroes[h.uuid]);
    this.modal.dismiss(heroes);
  }

  numSelectedHeroes(): number {
    return Object.values(this.heroes).filter(Boolean).length;
  }

  canConfirm(): boolean {
    const numSelected = this.numSelectedHeroes();
    return numSelected > 0 && numSelected <= this.maxMembers();
  }

  trackHeroBy(hero: Hero): string {
    return hero.uuid;
  }

  canHeroBeSelected(hero: Hero): boolean {
    return canHeroGoOnAdventure(hero) && this.numSelectedHeroes() < this.maxMembers();
  }

  maxMembers(): number {
    return calculateMaxMembersPerTeam(this.town);
  }

  membersRemaining(): number {
    return this.maxMembers() - this.numSelectedHeroes();
  }

}
