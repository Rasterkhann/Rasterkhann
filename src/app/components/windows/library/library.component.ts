import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../../interfaces';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {

  @Input() town: IGameTown;

  constructor() { }

  ngOnInit(): void {}

}
