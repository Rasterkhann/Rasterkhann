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
  @Input() public showCost: boolean;
  @Input() public showScrapIcon: boolean;
  @Input() public showPassedOver: boolean;

  public get color(): string {
    if (this.item.timesPassedOver === 0) { return ''; }
    if (this.item.timesPassedOver < 10)  { return 'primary'; }
    if (this.item.timesPassedOver < 50)  { return 'secondary'; }
    if (this.item.timesPassedOver < 100) { return 'warning'; }
    return 'danger';
  }

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
