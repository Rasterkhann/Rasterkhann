import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { sum } from 'lodash';

import { GameTown, Adventure, AdventureDifficulty, Hero } from '../../../interfaces';
import { GameService } from '../../../services';
import { formatDifficulty, getTownHeroByUUID } from '../../../helpers';
import { LegendaryHeroModalComponent } from './legendary-hero-modal/legendary-hero-modal.component';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdventureComponent implements OnInit {

  @Input() town: GameTown;
  @Input() adventure: Adventure;
  @Input() canDoAdventure: boolean;
  @Input() isActive: boolean;
  @Input() canQueue: boolean;

  public heroNames: string[] = [];

  constructor(private modal: ModalController, private game: GameService) { }

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

  difficultyExplanation(difficulty: AdventureDifficulty): string {
    return `Adventure has a difficulty multiplier of ${difficulty}x`;
  }

  async go(): Promise<void> {

    if (this.adventure.difficulty >= AdventureDifficulty.LegendaryStart) {
      const modal = await this.modal.create({
        component: LegendaryHeroModalComponent
      });

      await modal.present();

      const response: any = await modal.onDidDismiss();
      const heroes: Hero[] = response.data;
      if (!heroes || heroes.length === 0) { return; }

      const finalizeLegendary = () => {
        this.game.queueAdventureWithHeroes(this.town, this.adventure, heroes);
      };

      this.game.doSimpleConfirmation({
        header: 'Embark On Legendary Adventure',
        message: `Are you sure you want to send ${heroes.map(x => x.name).join(', ')} on this adventure?
        All heroes will be queued for the mission and it will commence when all are available.`,
        confirmText: 'Yes, Embark'
      }, finalizeLegendary);

      return;
    }

    const finalize = () => {
      this.game.startAdventure(this.town, this.adventure);
    };

    this.game.doSimpleConfirmation({
      header: 'Embark On Adventure',
      message: `Are you sure you want to embark on this adventure?`,
      confirmText: 'Yes, Embark'
    }, finalize);
  }

}
