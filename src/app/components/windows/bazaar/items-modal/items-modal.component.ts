import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GameService } from '../../../../services/game.service';
import { HeroItem, IGameTown, ItemType } from '../../../../interfaces';
import { calculateMaxCreatableItems } from '../../../../helpers';
import { GameState } from '../../../../states';

@Component({
  selector: 'app-items-modal',
  templateUrl: './items-modal.component.html',
  styleUrls: ['./items-modal.component.scss'],
})
export class ItemsModalComponent implements OnInit {

  @Select(GameState.currentTownItemsForSale) currentTownItemsForSale$: Observable<Record<ItemType, HeroItem[]>>;

  @Input() public town: IGameTown;

  constructor(private modal: ModalController, public game: GameService) { }

  ngOnInit(): void {}

  dismiss(): void {
    this.modal.dismiss();
  }

  public getTypeTotal(type: ItemType): number {
    return calculateMaxCreatableItems(this.town, type);
  }

  public getItems(itemsForSale: Record<ItemType, HeroItem[]>, type: ItemType): HeroItem[] {
    return itemsForSale[type];
  }

}
