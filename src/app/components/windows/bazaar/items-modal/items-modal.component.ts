import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GameService } from '../../../../services/game.service';
import { HeroItem, IGameTown, ItemType } from '../../../../interfaces';
import { calculateMaxCreatableItems } from '../../../../helpers';

@Component({
  selector: 'app-items-modal',
  templateUrl: './items-modal.component.html',
  styleUrls: ['./items-modal.component.scss'],
})
export class ItemsModalComponent implements OnInit {

  @Input() public town: IGameTown;

  constructor(private modal: ModalController, public game: GameService) { }

  ngOnInit(): void {}

  dismiss(): void {
    this.modal.dismiss();
  }

  public getTypeTotal(type: ItemType): number {
    return calculateMaxCreatableItems(this.town, type);
  }

  public getItems(type: ItemType): HeroItem[] {
    return this.town.itemsForSale[type];
  }

}
