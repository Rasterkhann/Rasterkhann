import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';

import { GameState } from '../../../../states';
import { GameTown, HeroStat, HeroJob } from '../../../../interfaces';
import { GameService } from '../../../../services/game.service';
import { getBoostedStatsForJobType } from '../../../../helpers';

@Component({
  selector: 'app-guild-crystal-modal',
  templateUrl: './crystal-modal.component.html',
  styleUrls: ['./crystal-modal.component.scss'],
})
export class GuildCrystalModalComponent implements OnDestroy, OnInit {

  @Select(GameState.currentTown) currentTown$: Observable<GameTown>;

  public get jobs(): HeroJob[] {
    return [HeroJob.Adventurer, HeroJob.Cleric, HeroJob.Mage, HeroJob.Thief, HeroJob.Warrior];
  }

  public get stats(): HeroStat[] {
    return [HeroStat.HP, HeroStat.SP, HeroStat.STA, HeroStat.ATK, HeroStat.DEF];
  }

  constructor(
    private modal: ModalController,
    public game: GameService
  ) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  dismiss(): void {
    this.modal.dismiss();
  }

  getJobStats(job: HeroJob): string[] {
    return getBoostedStatsForJobType(job).map(s => s.toUpperCase());
  }

}
