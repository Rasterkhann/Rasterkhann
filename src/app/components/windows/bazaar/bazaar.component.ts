import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GameTown, ItemType, HeroItem, Building } from '../../../interfaces';
import { calculateGlobalItemCostMultiplier, calculateMaxCreatableItems, getBazaarLoanPercent } from '../../../helpers';
import { ItemsModalComponent } from './items-modal/items-modal.component';
import { Store } from '@ngxs/store';
import { ChooseInfo } from '../../../actions';

@Component({
  selector: 'app-bazaar',
  templateUrl: './bazaar.component.html',
  styleUrls: ['./bazaar.component.scss'],
})
export class BazaarComponent implements OnInit, OnChanges {

  @Input() town: GameTown;
  @Input() autoOpen: boolean;

  public get costMultiplier(): number {
    return calculateGlobalItemCostMultiplier(this.town);
  }

  public get loanPercent(): number {
    return getBazaarLoanPercent(this.town);
  }

  public get itemTypes(): ItemType[] {
    return [ItemType.Weapon, ItemType.Armor, ItemType.Potion];
  }

  constructor(private modal: ModalController, private store: Store) { }

  ngOnInit(): void {
    if (this.autoOpen) {
      this.openItemsWindow();
      setTimeout(() => {
        this.store.dispatch(new ChooseInfo(Building.Bazaar, false));
      }, 0);
    }
  }

  ngOnChanges(changes: any): void {
    if (changes && changes.autoOpen && changes.autoOpen.currentValue && !changes.autoOpen.firstChange) {
      this.openItemsWindow();
      setTimeout(() => {
        this.store.dispatch(new ChooseInfo(Building.Bazaar, false));
      }, 0);
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
