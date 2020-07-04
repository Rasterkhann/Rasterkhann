import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { IGameTown, Adventure } from '../../../interfaces';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
})
export class AdventureComponent implements OnInit {

  @Input() town: IGameTown;
  @Input() adventure: Adventure;
  @Input() canDoAdventure: boolean;

  constructor(private alert: AlertController) { }

  ngOnInit(): void {}

  async go(): Promise<void> {

    const alert = await this.alert.create({
      header: 'Embark On Adventure',
      message: `Are you sure you want to embark on this adventure?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes, Embark',
          handler: async () => {
          }
        }
      ]
    });

    await alert.present();
  }

}
