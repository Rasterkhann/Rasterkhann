import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../../interfaces';

@Component({
  selector: 'app-cave',
  templateUrl: './cave.component.html',
  styleUrls: ['./cave.component.scss'],
})
export class CaveComponent implements OnInit {

  @Input() town: IGameTown;

  constructor() { }

  ngOnInit() {}

}
