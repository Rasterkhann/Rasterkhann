
import { Building } from '../interfaces';

export class UpgradeBuilding {
  static readonly type = '[Building] Upgrade Building';
  constructor(public building: Building) {}
}

export class UpgradeBuildingFeature {
  static readonly type = '[Building] Upgrade Building Feature';
  constructor(public building: Building, public feature: string, public constructionTime: number) {}
}
