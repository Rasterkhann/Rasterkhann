import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { sum } from 'lodash';

import { IGameTown, Adventure, AdventureDifficulty } from '../../../interfaces';
import { GameService } from '../../../services/game.service';
import { formatDifficulty, getTownHeroByUUID } from '../../../helpers';

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
  @Input() isActive: boolean;

  public heroNames: string[] = [];

  constructor(private alert: AlertController, private game: GameService) { }

  ngOnInit(): void {
    this.heroNames = this.adventure.activeHeroes
      .map(uuid => getTownHeroByUUID(this.town, uuid))
      .map(h => {
        if (!h) { return ''; }
        return h.name;
      })
      .filter(Boolean);
  }

  sumTicks(): number {
    return sum(this.adventure.encounterTicks);
  }

  formatPreDuration(text: string): string {
    const split = text.split(':');
    if (split.length === 2) {
      return `${split[0]}h ${split[1]}m`;
    }

    return `${split[0]}h ${split[1]}m ${split[2]}s`;
  }

  formatDifficulty(difficulty: AdventureDifficulty): string {
    return formatDifficulty(difficulty);
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
