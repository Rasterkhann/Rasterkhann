import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { GameTown, GameOption } from '../../../interfaces';
import { doesTownHaveFeature } from '../../../helpers';
import { GameService } from '../../../services';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
})
export class WorkshopComponent implements AfterViewInit, OnDestroy {

  @Input() town: GameTown;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationHeroes]) autoHeroes$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationBuildings]) autoBuildings$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationAdventures]) autoAdventures$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationFeatures]) autoFeatures$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationScrap]) autoScrap$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationRecruit]) autoRecruit$: Observable<boolean>;
  @Select((state: any) => state.gamestate.options[GameOption.AutomationRetire]) autoRetire$: Observable<boolean>;

  public optionValues: Partial<Record<GameOption, boolean>> = {
    [GameOption.AutomationHeroes]: false,
    [GameOption.AutomationBuildings]: false,
    [GameOption.AutomationAdventures]: false,
    [GameOption.AutomationScrap]: false,
    [GameOption.AutomationFeatures]: false,
    [GameOption.AutomationRecruit]: false,
    [GameOption.AutomationRetire]: false
  };

  private option$: Subscription;

  constructor(public game: GameService) { }

  ngAfterViewInit(): void {
    this.option$ = combineLatest([
      this.autoHeroes$,
      this.autoBuildings$,
      this.autoAdventures$,
      this.autoScrap$,
      this.autoFeatures$,
      this.autoRecruit$,
      this.autoRetire$
    ])
    .pipe(first())
    .subscribe(
      ([heroes, buildings, adventures, scrap, features, recruit, retire]) => {
        setTimeout(() => {
          this.optionValues = {
            [GameOption.AutomationHeroes]: heroes,
            [GameOption.AutomationBuildings]: buildings,
            [GameOption.AutomationAdventures]: adventures,
            [GameOption.AutomationScrap]: scrap,
            [GameOption.AutomationFeatures]: features,
            [GameOption.AutomationRecruit]: recruit,
            [GameOption.AutomationRetire]: retire
          };
        }, 0);
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
        || this.hasSpecificAutomation('Automation: Adventure')
        || this.hasSpecificAutomation('Automation: Scrap Items')
        || this.hasSpecificAutomation('Automation: Building Features')
        || this.hasSpecificAutomation('Automation: Recruit Heroes')
        || this.hasSpecificAutomation('Automation: Retire Heroes');
  }

}
