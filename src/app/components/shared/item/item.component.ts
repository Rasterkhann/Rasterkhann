import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { HeroItem, ItemType } from '../../../interfaces';

const SPRITESHEET_WIDTHS = {
  [ItemType.Potion]: 14,
  [ItemType.Weapon]: 16,
  [ItemType.Armor]: 12
};

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {

  @Input() public item: HeroItem;

  public get spritesheet(): string {
    return this.item.type.toLowerCase();
  }

  public get spriteLocation(): string {
    const divisor = SPRITESHEET_WIDTHS[this.item.type];
    const y = Math.floor(this.item.sprite / divisor);
    const x = this.item.sprite % divisor;

    return `-${x * 32}px -${y * 32}px`;
  }

  constructor() { }

  ngOnInit(): void {}

}
