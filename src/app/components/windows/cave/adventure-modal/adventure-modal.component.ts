import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';

import { GameService } from '../../../../services/game.service';
import { IGameTown, Adventure } from '../../../../interfaces';
import { GameState } from '../../../../states';
import { calculateMaxActiveAdventures } from '../../../../helpers';

@Component({
  selector: 'app-adventure-modal',
  templateUrl: './adventure-modal.component.html',
  styleUrls: ['./adventure-modal.component.scss'],
})
export class AdventureModalComponent implements OnInit {

  @Select(GameState.currentTownCanDoAdventures) canDoAdventures$: Observable<boolean>;
  @Select(GameState.currentTownActiveAdventures) activeAdventures$: Observable<Adventure[]>;
  @Select(GameState.currentTownPotentialAdventures) potentialAdventures$: Observable<Adventure[]>;

  @Input() public town: IGameTown;

  public get simultaneousAdventures(): number {
    return calculateMaxActiveAdventures(this.town);
  }

  constructor(private modal: ModalController, public game: GameService) { }

  ngOnInit(): void {}

  dismiss(): void {
    this.modal.dismiss();
  }

}
