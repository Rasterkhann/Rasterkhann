import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { IGameTown, TownStat } from '../../../../interfaces';
import { GameState } from '../../../../states';

@Component({
  selector: 'app-stats-modal',
  templateUrl: './stats-modal.component.html',
  styleUrls: ['./stats-modal.component.scss'],
})
export class TownStatsModalComponent implements OnInit {

  @Select(GameState.currentTown) currentTown$: Observable<IGameTown>;

  public headers: Record<TownStat, string> = {
    [TownStat.Adventures]: 'Adventures Completed',
    [TownStat.Encounters]: 'Encounters Completed',
    [TownStat.Gold]: 'Gold Earned',
    [TownStat.Levels]: 'Retired Level Total',
    [TownStat.Retires]: 'Retirements'
  };

  constructor(private modal: ModalController) { }

  ngOnInit(): void {}

  dismiss(): void {
    this.modal.dismiss();
  }

}
