import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../../interfaces';

@Component({
  selector: 'app-watchtower',
  templateUrl: './watchtower.component.html',
  styleUrls: ['./watchtower.component.scss'],
})
export class WatchtowerComponent implements OnInit {

  @Input() town: IGameTown;

  constructor() { }

  ngOnInit() {}

}
