import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../states/gamestate';

@Component({
  selector: 'app-current-info',
  templateUrl: './current-info.component.html',
  styleUrls: ['./current-info.component.scss'],
})
export class CurrentInfoComponent implements OnInit {

  @Input() public town: IGameTown;

  constructor() { }

  ngOnInit() {}

}
