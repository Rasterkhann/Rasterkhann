import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IGameTown } from '../../../interfaces';
import { HeroService } from '../../../hero.service';
import { GuildModalComponent } from './guild-modal/guild-modal.component';

@Component({
  selector: 'app-guildhall',
  templateUrl: './guildhall.component.html',
  styleUrls: ['./guildhall.component.scss'],
})
export class GuildHallComponent implements OnInit {

  @Input() town: IGameTown;

  constructor(private modalCtrl: ModalController, public hero: HeroService) { }

  ngOnInit(): void {}

  async openGuildWindow(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: GuildModalComponent,
      componentProps: {
        town: this.town
      }
    });

    await modal.present();
  }

}
