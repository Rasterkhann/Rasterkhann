import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../../interfaces';

@Component({
  selector: 'app-armory',
  templateUrl: './armory.component.html',
  styleUrls: ['./armory.component.scss'],
})
export class ArmoryComponent implements OnInit {

  @Input() town: IGameTown;

  constructor() { }

  ngOnInit(): void {}

}
