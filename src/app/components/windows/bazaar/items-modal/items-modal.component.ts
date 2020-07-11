import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GameService } from '../../../../services/game.service';
import { IGameTown } from '../../../../interfaces';

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

}
