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

  public get maxHeroes(): number {
    return calculateHeroMaxTotal(this.town);
  }

  public get jobsUnlocked(): string {
    return calculateAvailableJobs(this.town).join(', ');
  }

  constructor(private modal: ModalController) { }

  ngOnInit(): void {}

  async openGuildWindow(): Promise<void> {
    const modal = await this.modal.create({
      component: GuildModalComponent,
      componentProps: {
        town: this.town
      }
    });

    await modal.present();
  }

}
