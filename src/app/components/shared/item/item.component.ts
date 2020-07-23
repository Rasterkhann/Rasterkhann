import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { HeroItem, ItemPassedOverThreshold, ItemType } from '../../../interfaces';

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
    if (this.item.timesPassedOver === ItemPassedOverThreshold.New)          { return ''; }
    if (this.item.timesPassedOver < ItemPassedOverThreshold.MostlyFresh)    { return 'primary'; }
    if (this.item.timesPassedOver < ItemPassedOverThreshold.MostlyIgnored)  { return 'secondary'; }
    if (this.item.timesPassedOver < ItemPassedOverThreshold.TooMuch)        { return 'warning'; }
    return 'danger';
  }

  public get passedOverStatus(): string {
    if (this.item.timesPassedOver === ItemPassedOverThreshold.New)          { return ''; }
    if (this.item.timesPassedOver < ItemPassedOverThreshold.MostlyFresh)    { return 'Not many heroes have ignored this.'; }
    if (this.item.timesPassedOver < ItemPassedOverThreshold.MostlyIgnored)  { return 'This has been a bit ignored.'; }
    if (this.item.timesPassedOver < ItemPassedOverThreshold.TooMuch)        { return 'This has been ignored quite a bit.'; }
    return 'This probably will not be bought.';
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
