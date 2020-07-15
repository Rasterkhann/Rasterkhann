import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IGameTown } from '../../../interfaces';
import { AdventureModalComponent } from './adventure-modal/adventure-modal.component';
import { getTownExpMultiplier, getTownGoldMultiplier, calculateMaxActiveAdventures,
  calculateMaxNumberAdventureEncounters, calculateMaxMembersPerTeam } from '../../../helpers';

@Component({
  selector: 'app-cave',
  templateUrl: './cave.component.html',
  styleUrls: ['./cave.component.scss'],
})
export class CaveComponent implements OnInit {

  @Input() town: IGameTown;
  @Input() autoOpen: boolean;

  public get maxEncounters(): number {
    return calculateMaxNumberAdventureEncounters(this.town);
  }

  public get simultaneousAdventures(): number {
    return calculateMaxActiveAdventures(this.town);
  }

  public get maxTeamMembers(): number {
    return calculateMaxMembersPerTeam(this.town);
  }

  public get expModifier(): number {
    return getTownExpMultiplier(this.town) * 100;
  }

  public get goldModifier(): number {
    return getTownGoldMultiplier(this.town) * 100;
  }

  constructor(private modal: ModalController) { }

  ngOnInit(): void {
    if (this.autoOpen) {
      this.openAdventureWindow();
    }
  }

  async openAdventureWindow(): Promise<void> {
    const modal = await this.modal.create({
      component: AdventureModalComponent
    });

    await modal.present();
  }

}
