import { Injectable } from '@angular/core';

import { random, sum, sample } from 'lodash';
import { v4 as uuid } from 'uuid';
import { adventure as adventureName } from 'fantastical';

import { IGameTown, Adventure, Building, Hero, AdventureDifficulty } from '../interfaces';
import { calculateMaxNumberAdventureEncounters, calculateAvailableDifficulties, getTownAllHeroesFree } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  constructor() { }

  generateAdventure(town: IGameTown): Adventure {

    const encounterCount = random(1, calculateMaxNumberAdventureEncounters(town));
    const difficulty = sample(calculateAvailableDifficulties(town)) as AdventureDifficulty;

    const ticks = Array(encounterCount).fill(600).map(() => sample([300, 600, 1200, 1800])) as number[];

    const adventure: Adventure = {
      uuid: uuid(),
      name: adventureName(),
      difficulty,
      duration: sum(ticks),
      encounterLevel: random(1, town.buildings[Building.Cave].level),
      encounterTicks: ticks,
      encounterCount,
      activeHeroes: []
    };

    return adventure;
  }

  pickHeroesForAdventure(town: IGameTown, adventure: Adventure): Hero[] {
    const freeHeroes = getTownAllHeroesFree(town);
    const mainHero = sample(freeHeroes);
    if (!mainHero) { return []; }

    return [mainHero];
  }

}
