import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';

import { GameState } from '../../../../states';
import { GameTown, SkillBook } from '../../../../interfaces';
import { GameService, HeroService } from '../../../../services';
import { calculateMaxOwnedBooks } from '../../../../helpers';

@Component({
  selector: 'app-skill-modal',
  templateUrl: './skill-modal.component.html',
  styleUrls: ['./skill-modal.component.scss'],
})
export class SkillBookModalComponent implements OnDestroy, OnInit {

  @Select(GameState.currentTown) currentTown$: Observable<GameTown>;
  @Select(GameState.currentTownProspectiveBooks) prospectiveBooks$: Observable<SkillBook[]>;
  @Select(GameState.currentTownOwnedBooks) ownedBooks$: Observable<SkillBook[]>;

  constructor(
    private modal: ModalController,
    public game: GameService,
    public heroCreator: HeroService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  trackBookBy(book: SkillBook): string {
    return book.uuid;
  }

  dismiss(): void {
    this.modal.dismiss();
  }

  maxBooks(town: GameTown): number {
    return calculateMaxOwnedBooks(town);
  }

  rerollBooks(town: GameTown): void {
    setTimeout(() => {
      this.game.rerollBooks(town, true);
    }, 100);
  }

}
