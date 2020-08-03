import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GameTown, Building } from '../../../interfaces';
import { GuildModalComponent } from './guild-modal/guild-modal.component';
import { calculateAvailableJobs, calculateHeroMaxTotal } from '../../../helpers';
import { Store } from '@ngxs/store';
import { ChooseInfo } from '../../../actions';
import { GuildCrystalModalComponent } from './crystal-modal/crystal-modal.component';

@Component({
  selector: 'app-guildhall',
  templateUrl: './guildhall.component.html',
  styleUrls: ['./guildhall.component.scss'],
})
export class GuildHallComponent implements OnInit, OnChanges {

  @Input() town: GameTown;
  @Input() autoOpen: boolean;

  public get maxHeroes(): number {
    return calculateHeroMaxTotal(this.town);
  }

  public get jobsUnlocked(): string {
    return calculateAvailableJobs(this.town).join(', ');
  }

  constructor(private modal: ModalController, private store: Store) { }

  ngOnInit(): void {
    if (this.autoOpen) {
      this.openGuildWindow();
      setTimeout(() => {
        this.store.dispatch(new ChooseInfo(Building.GuildHall, false));
      }, 0);
    }
  }

  ngOnChanges(changes: any): void {
    if (changes && changes.autoOpen && changes.autoOpen.currentValue && !changes.autoOpen.firstChange) {
      this.openGuildWindow();
      setTimeout(() => {
        this.store.dispatch(new ChooseInfo(Building.GuildHall, false));
      }, 0);
    }
  }

  async openGuildWindow(): Promise<void> {
    const modal = await this.modal.create({
      component: GuildModalComponent
    });

    await modal.present();
  }

  async openGuildCrystalWindow(): Promise<void> {
    const modal = await this.modal.create({
      component: GuildCrystalModalComponent
    });

    await modal.present();
  }

}
