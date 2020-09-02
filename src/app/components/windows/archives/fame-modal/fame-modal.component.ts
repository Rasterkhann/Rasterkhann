import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GameTown, HallOfFameStat } from '../../../../interfaces';
import { GameState } from '../../../../states';

@Component({
  selector: 'app-fame-modal',
  templateUrl: './fame-modal.component.html',
  styleUrls: ['./fame-modal.component.scss'],
})
export class HallOfFameModalComponent implements OnInit {

  @Select(GameState.currentTown) currentTown$: Observable<GameTown>;

  public headers: Record<HallOfFameStat, string> = {
    [HallOfFameStat.HighestLevel]:      'Highest Level',
    [HallOfFameStat.MostAdventuresWon]: 'Adventures Won',
    [HallOfFameStat.MostDamageDealt]:   'Damage Dealt',
    [HallOfFameStat.MostDamageTaken]:   'Damage Taken',
    [HallOfFameStat.MostItemsBought]:   'Items Bought',
    [HallOfFameStat.MostPotionsUsed]:   'Potions Used'
  };

  constructor(private modal: ModalController) { }

  ngOnInit(): void {}

  dismiss(): void {
    this.modal.dismiss();
  }

  getHeader(header: HallOfFameStat): string {
    return this.headers[header];
  }

}
