import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { GameTown, NewsItem, Building } from '../../../interfaces';
import { GameState } from '../../../states';
import { TownStatsModalComponent } from './stats-modal/stats-modal.component';
import { ChooseInfo } from '../../../actions';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss'],
})
export class ArchivesComponent implements OnInit, OnChanges {

  @Input() town: GameTown;
  @Input() autoOpen: boolean;

  @Select(GameState.currentTownNotifications) notifications$: Observable<NewsItem[]>;

  constructor(private store: Store, private modal: ModalController) { }

  ngOnInit(): void {
    if (this.autoOpen) {
      this.openStatsWindow();
      setTimeout(() => {
        this.store.dispatch(new ChooseInfo(Building.Archives, false));
      }, 0);
    }
  }

  ngOnChanges(changes: any): void {
    if (changes && changes.autoOpen && changes.autoOpen.currentValue && !changes.autoOpen.firstChange) {
      this.openStatsWindow();
      setTimeout(() => {
        this.store.dispatch(new ChooseInfo(Building.Archives, false));
      }, 0);
    }
  }

  async openStatsWindow(): Promise<void> {
    const modal = await this.modal.create({
      component: TownStatsModalComponent
    });

    await modal.present();
  }

}
