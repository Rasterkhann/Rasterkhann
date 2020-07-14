import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IGameTown, ItemType, HeroItem } from '../../../interfaces';
import { calculateMaxCreatableItems } from '../../../helpers';
import { ItemsModalComponent } from './items-modal/items-modal.component';

@Component({
  selector: 'app-bazaar',
  templateUrl: './bazaar.component.html',
  styleUrls: ['./bazaar.component.scss'],
})
export class BazaarComponent implements OnInit {

  @Input() town: IGameTown;
  @Input() autoOpen: boolean;

  public get itemTypes(): ItemType[] {
    return [ItemType.Weapon, ItemType.Armor, ItemType.Potion];
  }

  constructor(private modal: ModalController) { }

  ngOnInit(): void {
    if (this.autoOpen) {
      this.openItemsWindow();
    }
  }

  public getTypeTotal(type: ItemType): number {
    return calculateMaxCreatableItems(this.town, type);
  }

  public getItems(type: ItemType): HeroItem[] {
    return this.town.itemsForSale[type];
  }

  public getConstructionType(type: ItemType): number {
    return this.town.nextItemCreation[type];
  }

  formatPreDuration(text: string): string {
    const split = text.split(':');
    return `${split[0]}m ${split[1]}s`;
  }

  async openItemsWindow(): Promise<void> {
    const modal = await this.modal.create({
      component: ItemsModalComponent,
      componentProps: {
        town: this.town
      }
    });

    await modal.present();
  }

}
