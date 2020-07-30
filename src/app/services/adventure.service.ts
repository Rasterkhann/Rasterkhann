import { Injectable } from '@angular/core';

import { random, sum, sample, sortBy, take } from 'lodash';
import { v4 as uuid } from 'uuid';
import { adventure as adventureName } from 'fantastical';

import { GameTown, Adventure, Building, Hero, AdventureDifficulty, HeroStat } from '../interfaces';
import { calculateMaxNumberAdventureEncounters, calculateAvailableDifficulties, getTownAllHeroesFree, calculateMaxMembersPerTeam } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  constructor() { }

  generateAdventure(town: GameTown): Adventure {

    const encounterCount = random(1, calculateMaxNumberAdventureEncounters(town));
    const difficulty = sample(calculateAvailableDifficulties(town)) as AdventureDifficulty;

    const ticks = Array(encounterCount).fill(600).map(() => sample([75, 150, 300, 600, 1200])) as number[];

    const possibleAdventureLevels = town.recruitedHeroes.map(h => h.currentStats[HeroStat.LVL]);
    const adventureLevel = sample(possibleAdventureLevels) as number;

    const adventure: Adventure = {
      uuid: uuid(),
      name: adventureName(),
      difficulty,
      duration: sum(ticks),
      encounterLevel: Math.min(adventureLevel, town.buildings[Building.Cave].level) || random(1, town.buildings[Building.Cave].level),
      encounterTicks: ticks,
      encounterCount,
      activeHeroes: []
    };

    return adventure;
  }

  pickHeroesForAdventure(town: GameTown, adventure: Adventure): Hero[] {
    const maxHeroes = random(1, calculateMaxMembersPerTeam(town));
    const freeHeroes = getTownAllHeroesFree(town);

    const heroOrder = sortBy(freeHeroes, h => Math.abs(adventure.encounterLevel - h.currentStats[HeroStat.LVL]));
    const heroes = take(heroOrder, maxHeroes);

    if (heroes.length === 0) { return []; }
    return heroes;
  }

}
