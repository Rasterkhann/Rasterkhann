
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { GameTown, HeroJob, TownStat } from '../interfaces';
import { JobCrystalUpgradeStat } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class CrystalService {

  constructor(private store: Store) {}

  public getAvailableJobCrystals(town: GameTown, job: HeroJob): bigint {
    return town.stats[TownStat.Retires][job] - town.stats[TownStat.CrystalsSpent][job];
  }

  public upgradeJobCrystalStat(town: GameTown, job: HeroJob): void {
    if (this.getAvailableJobCrystals(town, job) <= 0) { return; }
    this.store.dispatch(new JobCrystalUpgradeStat(job));
  }

}
