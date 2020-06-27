import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../../interfaces';

@Component({
  selector: 'app-townhall',
  templateUrl: './townhall.component.html',
  styleUrls: ['./townhall.component.scss'],
})
export class TownHallComponent implements OnInit {

  @Input() town: IGameTown;

  constructor() { }

  ngOnInit() {}

}
