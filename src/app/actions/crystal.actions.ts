import { HeroJob } from '../interfaces';

export class JobCrystalUpgradeStat {
  static readonly type = '[JobCrystal] Upgrade Stat';
  constructor(public job: HeroJob) {}
}
