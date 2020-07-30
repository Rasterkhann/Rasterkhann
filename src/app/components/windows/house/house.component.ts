import { Component, OnInit, Input } from '@angular/core';
import { GameTown } from '../../../interfaces';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
})
export class HouseComponent implements OnInit {

  @Input() town: GameTown;

  constructor() { }

  ngOnInit(): void {}

}
