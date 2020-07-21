import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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

  public get itemTypes(): ItemType[] {
    return [ItemType.Weapon, ItemType.Armor, ItemType.Potion];
  }

  constructor(private modal: ModalController, private alert: AlertController, public game: GameService) { }

  ngOnInit(): void {}

  dismiss(): void {
    this.modal.dismiss();
  }

  trackItemBy(item: HeroItem): string {
    return item.uuid;
  }

  public async scrapItem(item: HeroItem): Promise<void> {
    const alert = await this.alert.create({
      header: 'Scrap Item',
      message: `Are you sure you want to scrap ${item.name}? It will be gone forever and you will get no gold for this action.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes, Scrap',
          handler: async () => {
            this.game.scrapItem(item);
          }
        }
      ]
    });

    await alert.present();
  }

  public getTypeTotal(type: ItemType): number {
    return calculateMaxCreatableItems(this.town, type);
  }

  public getItems(itemsForSale: Record<ItemType, HeroItem[]>, type: ItemType): HeroItem[] {
    return itemsForSale[type];
  }

}
