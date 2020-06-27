import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../../interfaces';

@Component({
  selector: 'app-inn',
  templateUrl: './inn.component.html',
  styleUrls: ['./inn.component.scss'],
})
export class InnComponent implements OnInit {

  @Input() town: IGameTown;

  constructor() { }

  ngOnInit() {}

}
