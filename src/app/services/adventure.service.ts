import { Injectable } from '@angular/core';

import { random } from 'lodash';

import { IGameTown, Adventure } from '../interfaces';
import { calculateMaxNumberAdventureEncounters } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  constructor() { }

  generateAdventure(town: IGameTown): Adventure {

    const encounterCount = random(1, calculateMaxNumberAdventureEncounters(town));

    const adventure: Adventure = {
      name: 'Wild Adventure',
      duration: encounterCount * 600,
      encounterCount
    };

    return adventure;
  }

}
