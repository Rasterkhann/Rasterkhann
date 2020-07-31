import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Select } from '@ngxs/store';

import { Observable, Subscription } from 'rxjs';

import { GameState } from '../../../../states';
import { GameTown, Building, TownStat } from '../../../../interfaces';
import { GameService } from '../../../../services/game.service';
import { BuildingData } from '../../../../static';
import { numAllocatedToBuilding } from '../../../../helpers';

@Component({
  selector: 'app-allocation-modal',
  templateUrl: './allocation-modal.component.html',
  styleUrls: ['./allocation-modal.component.scss'],
})
export class WorkerAllocationModalComponent implements OnInit, OnDestroy {

  @Select(GameState.currentTown) currentTown$: Observable<GameTown>;

  @Input() public buildingId: Building;

  public town: GameTown;
  public originalCurrentAllocated = 0;
  public currentAllocated = 0;

  public get buildingName(): string {
    return BuildingData[this.buildingId].name;
  }

  public get buildingWorkerHelp(): string {
    return BuildingData[this.buildingId].workerHelp;
  }

  public get errorMessage(): string {
    const current = this.currentAllocated;
    const original = this.originalCurrentAllocated;

    if (current - original > this.getTotalWorkersUnallocated()) {
      return 'Cannot allocate more workers than are idle.';
    }

    return '';
  }

  private town$: Subscription;

  constructor(
    private modal: ModalController,
    public game: GameService,
  ) { }

  ngOnInit(): void {
    this.town$ = this.currentTown$.subscribe(town => {
      this.town = town;

      const numAllocatedHere = this.getTotalWorkersAllocatedHere();
      if (numAllocatedHere !== this.originalCurrentAllocated) {
        this.originalCurrentAllocated = numAllocatedHere;
        this.currentAllocated = numAllocatedHere;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.town$) { this.town$.unsubscribe(); }
  }

  dismiss(): void {
    this.modal.dismiss();
  }

  getTotalWorkers(): number {
    const town = this.town;
    return Number(Object.values(town.stats[TownStat.Retires]).reduce((prev, cur) => prev + cur, 0n));
  }

  getTotalWorkersAllocated(): number {
    const town = this.town;
    return Object.keys(town.buildings)
      .map((b: Building) => numAllocatedToBuilding(town, b))
      .reduce((prev, cur) => prev + cur, 0);
  }

  getTotalWorkersUnallocated(): number {
    const total = this.getTotalWorkers();
    const totalAllocated = this.getTotalWorkersAllocated();
    return total - totalAllocated;
  }

  getTotalWorkersAllocatedElsewhere(): number {
    const town = this.town;
    return Object.keys(town.buildings)
      .filter(b => b !== this.buildingId)
      .map((b: Building) => numAllocatedToBuilding(town, b))
      .reduce((prev, cur) => prev + cur, 0);
  }

  getTotalWorkersAllocatedHere(): number {
    const town = this.town;
    return numAllocatedToBuilding(town, this.buildingId);
  }

  allocateAll(): void {
    this.game.allocateAllWorkersToBuilding(this.buildingId);
  }

  allocateAllIdle(): void {
    this.game.allocateSomeWorkersToBuilding(this.buildingId, this.currentAllocated + this.getTotalWorkersUnallocated());
  }

  unallocateAll(): void {
    this.game.unallocateAllWorkersFromBuilding(this.buildingId);
  }

  allocateCurrent(): void {
    this.game.allocateSomeWorkersToBuilding(this.buildingId, this.currentAllocated);
  }
}
