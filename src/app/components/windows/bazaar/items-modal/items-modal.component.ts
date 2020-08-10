import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GameService } from '../../../../services/game.service';
import { HeroItem, GameTown, ItemType } from '../../../../interfaces';
import { calculateMaxCreatableItems } from '../../../../helpers';
import { GameState } from '../../../../states';

@Component({
  selector: 'app-items-modal',
  templateUrl: './items-modal.component.html',
  styleUrls: ['./items-modal.component.scss'],
})
export class ItemsModalComponent implements OnInit {

  @Select(GameState.currentTownItemsForSale) currentTownItemsForSale$: Observable<Record<ItemType, HeroItem[]>>;

  @Input() public town: GameTown;

  public get itemTypes(): ItemType[] {
    return [ItemType.Weapon, ItemType.Armor, ItemType.Potion];
  }

  constructor(private modal: ModalController, public game: GameService) { }

  ngOnInit(): void {}

  dismiss(): void {
    this.modal.dismiss();
  }

  trackItemBy(item: HeroItem): string {
    return item.uuid;
  }

  public async scrapItem(item: HeroItem): Promise<void> {
    const finalize = () => {
      this.game.scrapItem(item);
    };

    this.game.doSimpleConfirmation({
      header: 'Scrap Item',
      message: `Are you sure you want to scrap ${item.name}? It will be gone forever and you will get no gold for this action.`,
      confirmText: 'Yes, Scrap'
    }, finalize);
  }

  public getTypeTotal(type: ItemType): number {
    return calculateMaxCreatableItems(this.town, type);
  }

  public getItems(itemsForSale: Record<ItemType, HeroItem[]>, type: ItemType): HeroItem[] {
    return itemsForSale[type];
  }

  public getConstructionType(type: ItemType): number {
    return this.town.nextItemCreation[type];
  }

  formatPreDuration(text: string): string {
    const split = text.split(':');
    return `${split[0]}m ${split[1]}s`;
  }

}
