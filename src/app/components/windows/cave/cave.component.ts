import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IGameTown } from '../../../interfaces';
import { AdventureModalComponent } from './adventure-modal/adventure-modal.component';

@Component({
  selector: 'app-cave',
  templateUrl: './cave.component.html',
  styleUrls: ['./cave.component.scss'],
})
export class CaveComponent implements OnInit {

  @Input() town: IGameTown;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit(): void {}

  async openAdventureWindow(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AdventureModalComponent,
      componentProps: {
        town: this.town
      }
    });

    await modal.present();
  }

}
