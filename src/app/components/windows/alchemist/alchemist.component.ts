import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../../interfaces';

@Component({
  selector: 'app-alchemist',
  templateUrl: './alchemist.component.html',
  styleUrls: ['./alchemist.component.scss'],
})
export class AlchemistComponent implements OnInit {

  @Input() town: IGameTown;

  constructor() { }

  ngOnInit(): void {}

}
