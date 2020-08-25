import { Injectable } from '@angular/core';

import { random, sum, sample, sortBy, take } from 'lodash';
import { v4 as uuid } from 'uuid';
import { adventure as adventureName } from 'fantastical';
import * as seedrandom from 'seedrandom';

import { GameTown, Adventure, Building, Hero, AdventureDifficulty, HeroStat, TownStat, HeroJob } from '../interfaces';
import { calculateMaxNumberAdventureEncounters, calculateAvailableDifficulties,
  getTownAllHeroesFree, calculateMaxMembersPerTeam, calculateAvailableJobs, createZeroHeroBlock } from '../helpers';
import { CrystalService } from './crystal.service';

interface AdventureOpts {
  startDifficulty?: AdventureDifficulty | number;
  numEncounters?: number;
  setDuration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  constructor(private crystalService: CrystalService) { }

  private calculateNumLegendaryAdventureNext(town: GameTown): number {
    return Number(1n + (town.stats[TownStat.Legendary].Adventures || 0n));
  }

  private pickFromArrayWithTownSeed(town: GameTown, arr: string[], seedmod: string): string {
    const seed = this.calculateNumLegendaryAdventureNext(town);
    const rng = seedrandom(seed.toString() + seedmod);
    const entryIdx = Math.floor(rng() * arr.length);
    return arr[entryIdx];
  }

  private pickLegendaryBoss(town: GameTown): string {
    return this.pickFromArrayWithTownSeed(town, [
      'Bake-kujira', 'Ceffyl Dŵr', 'Encantado', 'Kelpie', 'Kushtaka', 'Selkie',
      'Anansi', 'Arachne', 'Khepri', 'Tsuchigomo', 'Myrmecoleon', 'Myrmidon',
      'Jorōgumo', 'Karkinos', 'Mothman', 'Pabilsag', 'Selket',
      'Balayang', 'Chupacabra', 'Camazotz', 'Leutogi', 'Minyades', 'Tjinimin', 'Vetala',
      'Bugbear', 'Calisto', 'Ababil', 'Adarna', 'Aethon', 'Alkonost', 'Alectryon', 'Alicanto', 'Anzû',
      'Bennu', 'Cockatrice', 'Caladrius', 'Cetan', 'Chalkydri', 'Chamrosh', 'Feng Huang', 'Gandabherunda',
      'Gamayun', 'Garuda', 'Griffin', 'Harpy', 'Hippogriff', 'Hræsvelgr', 'Hudhud', 'Horus', 'Hugin & Munin',
      'Itsumade', 'Minokawa', 'Nachtkrapp', 'Nyctimene', 'Pamola', 'Phoenix', 'Piasa', 'Ra', 'Roc',
      'Shangyang', 'Simurgh', 'Sirin', 'Tengu', 'Thunderbird', 'Thoth', 'Turul', 'Vucub Caquix',
      'Yatagarasu', 'Zhenniao', 'Ziz', 'Zu', 'Basan', 'Cockatrice', 'Gullinkambi', 'Sarimanok', 'Víðópnir',
      'Adlet', 'Amarok', 'Anubis', 'Aralez', 'Asena', 'Carbuncle', 'Cerberus', 'Cu Sith', 'Crocotta', 'Cynocephaly',
      'Fenrir', 'Gelert', 'Hellhound', 'Kitsune', 'Orthrus', 'Penghou', 'Salawa', 'Sigbin', 'Tanuki', 'Vǎrkolak', 'Werewolf',
      'Bakeneko', 'Bast', 'Cait Sidhe', 'Cath Palug', 'Chimera', 'Lamassu', 'Manticore', 'Merilon', 'Nemean Lion',
      'Sekhmet', 'Sphinx', 'Mermaid', 'Undine', 'Ika-Roa', 'Namazu', 'Kishi', 'Drop Bear', 'Bunyip', 'Kraken',
      'Bigfoot', 'Yeti', 'Yowie', 'Al-mi\'raj', 'Basilisk', 'Dragon', 'Wyvern', 'Amphisbaena', 'Jörmungandr',
      'Lamia', 'Níðhöggr', 'Tarasque', 'Hydra', 'Minotaur', 'Ushi-oni', 'Satyr', 'Centaur', 'Pegasus', 'Unicorn',
      'Sleipnir', 'Zhu Bajie', 'Nephele', 'Banshee',
      'Gingerbread Man', 'Evil Clown'
    ], '') as string;
  }

  doesTownHaveEnoughCrystalsForLegendaryAdventure(town: GameTown): boolean {
    const cost = this.getLegendaryAdventureCost(town);

    let hasEnough = true;
    Object.keys(cost).forEach((jobKey: HeroJob) => {
      if (cost[jobKey] <= this.crystalService.getAvailableJobCrystals(town, jobKey)) { return; }
      hasEnough = false;
    });

    return hasEnough;
  }

  getLegendaryAdventureCost(town: GameTown): Record<HeroJob, number> {
    const numNeeded = this.calculateNumLegendaryAdventureNext(town);
    const baseJobs = calculateAvailableJobs(town);

    const hash: Record<HeroJob, number> = createZeroHeroBlock();

    for (let i = 0; i < numNeeded; i++) {
      const choice: HeroJob = this.pickFromArrayWithTownSeed(town, baseJobs, i.toString()) as HeroJob;
      hash[choice] = hash[choice] || 0;
      hash[choice]++;
    }

    return hash;
  }

  generateLegendaryAdventure(town: GameTown): Adventure {
    const difficultyBoost = town.stats[TownStat.Legendary].Adventures || 0n;
    const difficulty = AdventureDifficulty.LegendaryStart + Number(difficultyBoost);
    const adventure = this.generateAdventure(town, { startDifficulty: difficulty, numEncounters: 5, setDuration: 360 });

    adventure.bossName = this.pickLegendaryBoss(town);
    adventure.name = `Quest to Kill ${adventure.bossName}`;

    adventure.encounterLevel = 50 + (Number(difficultyBoost) * 10);

    return adventure;
  }

  generateAdventure(
    town: GameTown,
    { startDifficulty, numEncounters, setDuration }: AdventureOpts = {}
  ): Adventure {

    const encounterCount = numEncounters || random(1, calculateMaxNumberAdventureEncounters(town));
    const difficulty = startDifficulty || sample(calculateAvailableDifficulties(town)) as AdventureDifficulty;

    const ticks = Array(encounterCount).fill(600).map(() => setDuration || sample([75, 150, 300, 600, 1200])) as number[];

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
