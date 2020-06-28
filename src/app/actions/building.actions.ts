
import { Building } from '../interfaces';

export class UpgradeBuilding {
  static readonly type = '[Building] Upgrade Building';
  constructor(public building: Building) {}
}
