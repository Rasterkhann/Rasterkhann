import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IGameTown } from '../../../interfaces';
import { GuildModalComponent } from './guild-modal/guild-modal.component';
import { calculateAvailableJobs, calculateHeroMaxTotal } from '../../../helpers';

@Component({
  selector: 'app-guildhall',
  templateUrl: './guildhall.component.html',
  styleUrls: ['./guildhall.component.scss'],
})
export class GuildHallComponent implements OnInit {

  @Input() town: IGameTown;
  @Input() autoOpen: boolean;

  public get maxHeroes(): number {
    return calculateHeroMaxTotal(this.town);
  }

  public get jobsUnlocked(): string {
    return calculateAvailableJobs(this.town).join(', ');
  }

  constructor(private modal: ModalController) { }

  ngOnInit(): void {
    if (this.autoOpen) {
      this.openGuildWindow();
    }
  }

  async openGuildWindow(): Promise<void> {
    const modal = await this.modal.create({
      component: GuildModalComponent
    });

    await modal.present();
  }

}
