import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IGameTown, Building } from '../../../interfaces';
import { AdventureModalComponent } from './adventure-modal/adventure-modal.component';
import { getTownExpMultiplier, getTownGoldMultiplier, calculateMaxActiveAdventures,
  calculateMaxNumberAdventureEncounters, calculateMaxMembersPerTeam } from '../../../helpers';
import { CombatLogModalComponent } from './combat-log-modal/combat-log-modal.component';
import { ChooseInfo } from '../../../actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-cave',
  templateUrl: './cave.component.html',
  styleUrls: ['./cave.component.scss'],
})
export class CaveComponent implements OnInit, OnChanges {

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
    return (getTownExpMultiplier(this.town) - 1) * 100;
  }

  public get goldModifier(): number {
    return (getTownGoldMultiplier(this.town) - 1) * 100;
  }

  constructor(private modal: ModalController, private store: Store) { }

  ngOnInit(): void {
    if (this.autoOpen) {
      this.openAdventureWindow();
      setTimeout(() => {
        this.store.dispatch(new ChooseInfo(Building.Cave, false));
      }, 0);
    }
  }

  ngOnChanges(changes: any): void {
    if (changes && changes.autoOpen && changes.autoOpen.currentValue && !changes.autoOpen.firstChange) {
      this.openAdventureWindow();
      setTimeout(() => {
        this.store.dispatch(new ChooseInfo(Building.Cave, false));
      }, 0);
    }
  }

  async openAdventureWindow(): Promise<void> {
    const modal = await this.modal.create({
      component: AdventureModalComponent
    });

    await modal.present();
  }

  async openLogWindow(): Promise<void> {
    const modal = await this.modal.create({
      component: CombatLogModalComponent,
      componentProps: {
        town: this.town
      }
    });

    await modal.present();
  }

}
