import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { formatDifficulty } from '../../../../helpers';
import { AdventureDifficulty, CombatLog, IGameTown } from '../../../../interfaces';

@Component({
  selector: 'app-combat-log-modal',
  templateUrl: './combat-log-modal.component.html',
  styleUrls: ['./combat-log-modal.component.scss'],
})
export class CombatLogModalComponent implements OnInit {

  @Input() town: IGameTown;

  public isLogVisible: Record<string, boolean> = {};

  constructor(private modal: ModalController) { }

  ngOnInit(): void {
    if (this.town.combatLogs[0]) {
      this.toggleLogVisibility(this.town.combatLogs[0]);
    }
  }

  dismiss(): void {
    this.modal.dismiss();
  }

  private logKey(log: CombatLog): string {
    return log.advName + log.encNum + log.timestamp;
  }

  toggleLogVisibility(log: CombatLog): void {
    this.isLogVisible[this.logKey(log)] = !this.isLogVisible[this.logKey(log)];
  }

  isLogEntryVisible(log: CombatLog): boolean {
    return this.isLogVisible[this.logKey(log)];
  }

  formatDifficulty(difficulty: AdventureDifficulty): string {
    return formatDifficulty(difficulty);
  }
}
