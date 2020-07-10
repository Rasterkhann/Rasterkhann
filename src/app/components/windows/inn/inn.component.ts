import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../../interfaces';
import { calculateRestingRate, calculateRestingCost } from '../../../helpers';

@Component({
  selector: 'app-inn',
  templateUrl: './inn.component.html',
  styleUrls: ['./inn.component.scss'],
})
export class InnComponent implements OnInit {

  @Input() town: IGameTown;

  public get restingRate(): number {
    return calculateRestingRate(this.town);
  }

  public get goldPerRestTick(): number {
    return calculateRestingCost(this.town);
  }

  constructor() { }

  ngOnInit(): void {}

}
