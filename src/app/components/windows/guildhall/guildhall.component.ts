import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../../interfaces';

@Component({
  selector: 'app-guildhall',
  templateUrl: './guildhall.component.html',
  styleUrls: ['./guildhall.component.scss'],
})
export class GuildHallComponent implements OnInit {

  @Input() town: IGameTown;

  constructor() { }

  ngOnInit() {}

}
