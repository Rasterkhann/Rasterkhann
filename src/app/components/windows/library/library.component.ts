import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GameTown, Building } from '../../../interfaces';
import { calculateMaxNumberOfTraits, getLibraryBadTraitModifier, getLibraryGoodTraitModifier } from '../../../helpers';
import { SkillBookModalComponent } from './skill-modal/skill-modal.component';
import { ChooseInfo } from '../../../actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit, OnChanges {

  @Input() town: GameTown;
  @Input() autoOpen: boolean;

  public get maxTraits(): number {
    return calculateMaxNumberOfTraits(this.town);
  }

  public get traitBadBonus(): number {
    return getLibraryBadTraitModifier(this.town);
  }

  public get traitGoodBonus(): number {
    return getLibraryGoodTraitModifier(this.town);
  }

  constructor(private modal: ModalController, private store: Store) { }

  ngOnInit(): void {
    if (this.autoOpen) {
      this.openBooksWindow();
      setTimeout(() => {
        this.store.dispatch(new ChooseInfo(Building.Library, false));
      }, 0);
    }
  }

  ngOnChanges(changes: any): void {
    if (changes && changes.autoOpen && changes.autoOpen.currentValue && !changes.autoOpen.firstChange) {
      this.openBooksWindow();
      setTimeout(() => {
        this.store.dispatch(new ChooseInfo(Building.Bazaar, false));
      }, 0);
    }
  }

  async openBooksWindow(): Promise<void> {
    const modal = await this.modal.create({
      component: SkillBookModalComponent
    });

    await modal.present();
  }

}
