import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { sortBy, get } from 'lodash';

import { GameService } from '../../../services';
import { GameTown, Building, BuildingFeature } from '../../../interfaces';
import { visibleBuildingFeatures, doesTownHaveFeature, allBuildingFeatures,
  upcomingBuildingFeatures, isBuildingFeatureHidden, formatTownStat } from '../../../helpers';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureListComponent implements OnInit {

  @Input() town: GameTown;
  @Input() buildingId: Building;

  public get allVisibleFeatures(): BuildingFeature[] {
    return visibleBuildingFeatures(this.town, this.buildingId);
  }

  public get areAllUpgradesOwned(): boolean {
    return allBuildingFeatures(this.buildingId).every(feat => doesTownHaveFeature(this.town, feat.name));
  }

  public get nextUpgradeString(): string {
    const nextUpgrades = upcomingBuildingFeatures(this.town, this.buildingId);
    if (nextUpgrades.length === 0) { return ''; }

    const nextUpgrade = sortBy(nextUpgrades, 'requiresLevel')[0];
    let upgradeString = `Next upgrade at level ${nextUpgrade.requiresLevel}`;

    const featuresNeeded = Object.keys(nextUpgrade.requiresFeature || {})
      .filter(k => !doesTownHaveFeature(this.town, k) && !isBuildingFeatureHidden(this.town, this.buildingId, k));

    if (featuresNeeded.length > 0) {
      upgradeString = `${upgradeString}; requires ${featuresNeeded.join(', ')}`;
    }

    if (nextUpgrade.requiresTownStat) {
      if (!this.town.showStage2UI) {
        return `The next upgrade requires at least one retired hero.`;
      }

      const statObj = nextUpgrade.requiresTownStat || {};
      const stats = Object.keys(statObj).map(s => `${formatTownStat(s)} (${get(this.town.stats, s)}/${statObj[s]})`);

      upgradeString = `${upgradeString}; requires ${stats.join(', ')}`;
    }

    return upgradeString;
  }

  constructor(public game: GameService) { }

  ngOnInit(): void {}

}
