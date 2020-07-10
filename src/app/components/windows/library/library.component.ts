import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../../interfaces';
import { calculateMaxNumberOfTraits } from '../../../helpers';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {

  @Input() town: IGameTown;

  public get maxTraits(): number {
    return calculateMaxNumberOfTraits(this.town);
  }

  constructor() { }

  ngOnInit(): void {}

}
