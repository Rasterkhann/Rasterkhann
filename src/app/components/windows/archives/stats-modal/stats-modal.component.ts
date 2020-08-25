import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GameTown, TownStat } from '../../../../interfaces';
import { GameState } from '../../../../states';

@Component({
  selector: 'app-stats-modal',
  templateUrl: './stats-modal.component.html',
  styleUrls: ['./stats-modal.component.scss'],
})
export class TownStatsModalComponent implements OnInit {

  @Select(GameState.currentTown) currentTown$: Observable<GameTown>;

  public tooltips: Record<string, (val: number) => string> = {
    [`${TownStat.Legendary}.Adventures`]: (val) => `+${val}% EXP/GOLD`
  };

  public headers: Record<TownStat, string> = {
    [TownStat.Adventures]:    'Adventures Won',
    [TownStat.Encounters]:    'Encounters Won',
    [TownStat.Gold]:          'Gold Earned',
    [TownStat.Levels]:        'Retired Level Total',
    [TownStat.Retires]:       'Retirements',
    [TownStat.CrystalsSpent]: 'Job Crystals Spent',
    [TownStat.Legendary]:     'Legendary Feats'
  };

  constructor(private modal: ModalController) { }

  ngOnInit(): void {}

  dismiss(): void {
    this.modal.dismiss();
  }

  getHeader(header: TownStat): string {
    return this.headers[header];
  }

  sumSection(section: Record<string, bigint>): bigint {
    return Object.values(section).reduce((prev, cur) => prev + cur, 0n);
  }

  hasTooltip(header: string, subheader: string): boolean {
    return !!this.tooltips[`${header}.${subheader}`];
  }

  getTooltip(header: string, subheader: string, value: number): string {
    if (!this.hasTooltip(header, subheader)) { return ''; }
    return this.tooltips[`${header}.${subheader}`](value);
  }

}
