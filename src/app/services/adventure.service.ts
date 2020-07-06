import { Injectable } from '@angular/core';

import { random, sum } from 'lodash';
import { v4 as uuid } from 'uuid';
import { adventure as adventureName } from 'fantastical';

import { IGameTown, Adventure, Building, Hero } from '../interfaces';
import { calculateMaxNumberAdventureEncounters } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  constructor() { }

  generateAdventure(town: IGameTown): Adventure {

    const encounterCount = random(1, calculateMaxNumberAdventureEncounters(town));

    const ticks = Array(encounterCount).fill(600);

    const adventure: Adventure = {
      uuid: uuid(),
      name: adventureName(),
      duration: sum(ticks),
      encounterLevel: random(1, town.buildings[Building.Cave].level),
      encounterTicks: ticks,
      encounterCount,
      activeHeroes: []
    };

    return adventure;
  }

  pickHeroesForAdventure(town: IGameTown, adventure: Adventure): Hero[] {
    return town.recruitedHeroes.filter(h => !h.onAdventure).slice(0, 1);
  }

}
