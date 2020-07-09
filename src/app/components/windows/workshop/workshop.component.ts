import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest, Subscription } from 'rxjs';

import { IGameTown, GameOption } from '../../../interfaces';
import { doesTownHaveFeature } from '../../../helpers';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
})
export class WorkshopComponent implements AfterViewInit, OnDestroy {

  @Input() town: IGameTown;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationHeroes]) autoHeroes$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationBuildings]) autoBuildings$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationAdventures]) autoAdventures$: Observable<boolean>;

  public optionValues: boolean[] = [];

  private option$: Subscription;

  constructor(public game: GameService) { }

  ngAfterViewInit(): void {
    this.option$ = combineLatest([
      this.autoHeroes$,
      this.autoBuildings$,
      this.autoAdventures$
    ]).subscribe(opts => {
      this.optionValues = opts;
    });
  }

  ngOnDestroy(): void {
    if (this.option$) { this.option$.unsubscribe(); }
  }

  toggleOption(option: string): void {
    this.game.toggleOption(option as GameOption);
  }

  hasSpecificAutomation(auto: string): boolean {
    return doesTownHaveFeature(this.town, auto);
  }

  hasAnyAutomation(): boolean {
    return this.hasSpecificAutomation('Automation: Upgrade Buildings')
        || this.hasSpecificAutomation('Automation: Train Heroes')
        || this.hasSpecificAutomation('Automation: Adventure');
  }

}
