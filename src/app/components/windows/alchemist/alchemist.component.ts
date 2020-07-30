import { Component, OnInit, Input } from '@angular/core';
import { GameTown, ItemType } from '../../../interfaces';
import { calculateMaxCreatableItems, calculateSecondsUntilNextItem } from '../../../helpers';

@Component({
  selector: 'app-alchemist',
  templateUrl: './alchemist.component.html',
  styleUrls: ['./alchemist.component.scss'],
})
export class AlchemistComponent implements OnInit {

  @Input() town: GameTown;

  public get maximumPotions(): number {
    return calculateMaxCreatableItems(this.town, ItemType.Potion);
  }

  public get potionCreationTime(): number {
    return calculateSecondsUntilNextItem(this.town, ItemType.Potion);
  }

  constructor() { }

  ngOnInit(): void {}

}
