import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';

import { GameService } from '../../../../services';
import { GameTown, Adventure, AdventureDifficulty, HeroJob } from '../../../../interfaces';
import { GameState } from '../../../../states';
import { calculateMaxActiveAdventures } from '../../../../helpers';

@Component({
  selector: 'app-adventure-modal',
  templateUrl: './adventure-modal.component.html',
  styleUrls: ['./adventure-modal.component.scss'],
})
export class AdventureModalComponent implements OnInit {

  @Select(GameState.currentTown) currentTown$: Observable<GameTown>;
  @Select(GameState.currentTownCanDoAdventures) canDoAdventures$: Observable<boolean>;
  @Select(GameState.currentTownActiveAdventures) activeAdventures$: Observable<Adventure[]>;
  @Select(GameState.currentTownPotentialAdventures) potentialAdventures$: Observable<Adventure[]>;
  @Select(GameState.currentTownLegendaryAdventures) legendaryAdventures$: Observable<Adventure[]>;

  constructor(private modal: ModalController, public game: GameService) { }

  ngOnInit(): void {}

  dismiss(): void {
    this.modal.dismiss();
  }

  rerollAdventures(town: GameTown): void {
    setTimeout(() => {
      this.game.rerollAdventures(town, true);
    }, 100);
  }

  public simultaneousAdventures(town: GameTown): number {
    return calculateMaxActiveAdventures(town);
  }

  public hasActiveLegendaryAdventure(town: GameTown): boolean {
    return town.activeAdventures.some(adv => adv.difficulty >= AdventureDifficulty.LegendaryStart);
  }

  generateLegendaryAdventure(town: GameTown): void {
    const cost = this.game.getLegendaryAdventureCost(town);
    const costString = Object.keys(cost)
      .filter((key: HeroJob) => cost[key] > 0)
      .map((key: HeroJob) => `${cost[key]}/${this.game.getAvailableJobCrystals(town, key)} ${key} Crystal${cost[key] > 1 ? 's' : ''}`)
      .join(', ');

    const doesHaveEnough = this.game.doesTownHaveEnoughCrystalsForLegendaryAdventure(town);

    const finalize = () => {
      if (!this.game.doesTownHaveEnoughCrystalsForLegendaryAdventure(town)) { return; }
      this.game.generateLegendaryAdventure(town);
    };

    this.game.doSimpleConfirmation({
      header: 'Seek Legendary Adventure',
      message: `Are you sure you want to seek out a legendary adventure? It will cost ${costString}.

      ${doesHaveEnough ? '' : '<br><br>You do not have enough crystals to do this!'}`,
      showAlways: true,
      confirmText: doesHaveEnough ? 'Yes, Seek' : 'Okay'
    }, finalize);
  }

}
