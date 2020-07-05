import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { IGameTown, Adventure } from '../../../interfaces';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdventureComponent implements OnInit {

  @Input() town: IGameTown;
  @Input() adventure: Adventure;
  @Input() canDoAdventure: boolean;

  constructor(private alert: AlertController, private game: GameService) { }

  ngOnInit(): void {}

  formatPreDuration(text: string): string {
    return text.split(':').join('h ') + 'm';
  }

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
            this.game.startAdventure(this.town, this.adventure);
          }
        }
      ]
    });

    await alert.present();
  }

}
