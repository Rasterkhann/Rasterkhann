import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IGameTown, ItemType } from '../../../interfaces';
import { calculateMaxCreatableItems } from '../../../helpers';
import { ItemsModalComponent } from './items-modal/items-modal.component';

@Component({
  selector: 'app-bazaar',
  templateUrl: './bazaar.component.html',
  styleUrls: ['./bazaar.component.scss'],
})
export class BazaarComponent implements OnInit {

  @Input() town: IGameTown;

  constructor(private modal: ModalController) { }

  ngOnInit(): void {}

  public typeTotal(type: ItemType): number {
    return calculateMaxCreatableItems(this.town, type);
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
