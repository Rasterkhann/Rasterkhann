import { Component, OnInit, Input } from '@angular/core';
import { GameTown, ItemType } from '../../../interfaces';
import { calculateMaxCreatableItems, calculateRepairCost, calculateRepairRate, calculateSecondsUntilNextItem } from '../../../helpers';

@Component({
  selector: 'app-armory',
  templateUrl: './armory.component.html',
  styleUrls: ['./armory.component.scss'],
})
export class ArmoryComponent implements OnInit {

  @Input() town: GameTown;

  public get maximumArmors(): number {
    return calculateMaxCreatableItems(this.town, ItemType.Armor);
  }

  public get armorCreationTime(): number {
    return calculateSecondsUntilNextItem(this.town, ItemType.Armor);
  }

  public get maximumWeapons(): number {
    return calculateMaxCreatableItems(this.town, ItemType.Weapon);
  }

  public get weaponCreationTime(): number {
    return calculateSecondsUntilNextItem(this.town, ItemType.Weapon);
  }

  public get repairRate(): number {
    return calculateRepairRate(this.town);
  }

  public get goldPerRepairTick(): number {
    return calculateRepairCost(this.town);
  }

  constructor() { }

  ngOnInit(): void {}

}
