import { Component, OnInit, Input } from '@angular/core';
import { GameTown } from '../../../interfaces';
import { calculateMaxNumberOfTraits, getLibraryBadTraitModifier, getLibraryGoodTraitModifier } from '../../../helpers';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {

  @Input() town: GameTown;

  public get maxTraits(): number {
    return calculateMaxNumberOfTraits(this.town);
  }

  public get traitBadBonus(): number {
    return getLibraryBadTraitModifier(this.town);
  }

  public get traitGoodBonus(): number {
    return getLibraryGoodTraitModifier(this.town);
  }

  constructor() { }

  ngOnInit(): void {}

}
