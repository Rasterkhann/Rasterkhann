import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameService } from '../../../../game.service';
import { IGameTown } from '../../../../interfaces';

@Component({
  selector: 'app-adventure-modal',
  templateUrl: './adventure-modal.component.html',
  styleUrls: ['./adventure-modal.component.scss'],
})
export class AdventureModalComponent implements OnInit {

  @Input() public town: IGameTown;

  constructor(private modalCtrl: ModalController, public game: GameService) { }

  ngOnInit(): void {}

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

}
