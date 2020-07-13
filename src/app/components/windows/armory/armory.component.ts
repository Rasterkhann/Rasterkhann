import { Component, OnInit, Input } from '@angular/core';
import { IGameTown, ItemType } from '../../../interfaces';
import { calculateMaxCreatableItems, calculateSecondsUntilNextItem } from '../../../helpers';
import { generateArmor } from '../../../helpers/armor';

@Component({
  selector: 'app-armory',
  templateUrl: './armory.component.html',
  styleUrls: ['./armory.component.scss'],
})
export class ArmoryComponent implements OnInit {

  @Input() town: IGameTown;

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

  constructor() { }

  ngOnInit(): void {}

}
