import { Injectable } from '@angular/core';

import { shuffle, take, random, sum } from 'lodash';

import { Hero, IGameTown, ProspectiveHero, TraitPriority,
  HeroStat, Building, HeroJobStatic, TraitEffect, TraitTrigger } from './interfaces';
import { calculateAvailableJobs, calculateMaxNumberOfTraits, calculateAvailableTraits } from './helpers';
import { JobEffects, TraitEffects } from './static';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  generateHero(town: IGameTown): Hero {

    const guildHallLevel = town.buildings[Building.GuildHall].level || 1;

    const allJobs = calculateAvailableJobs(town);
    const allTraits = calculateAvailableTraits(town);
    const maxTraits = calculateMaxNumberOfTraits(town);

    const job = take(shuffle(allJobs))[0];
    const numTraits = random(1, maxTraits);
    const traits = [];

    const jobStatic: HeroJobStatic = JobEffects[job];

    // pick traits
    if (numTraits > 1) {
      traits.push(...take(shuffle(allTraits.filter(t => TraitEffects[t].priority !== TraitPriority.Last)), numTraits - 1));
    }

    traits.push(...take(shuffle(allTraits.filter(t => TraitEffects[t].priority === TraitPriority.Last))));

    // pick a hero level
    const heroLevel = random(1, guildHallLevel);

    const stats = {
      [HeroStat.LVL]: heroLevel
    };

    // create the random stat block
    Object.values(HeroStat).forEach(stat => {
      if (stats[stat]) { return; }
      stats[stat] = random(1, heroLevel * jobStatic.statGrowth[stat]() * jobStatic.statBaseMultiplier[stat]);
    });

    // create the hero
    const hero: Hero = {
      name: jobStatic.chooseName(),
      sprite: take(shuffle(jobStatic.sprites))[0],

      job,
      traits,

      stats: stats as Record<HeroStat, number>,
      currentStats: stats as Record<HeroStat, number>,
      gear: {}
    };

    // do onSpawn for all traits
    traits.forEach(trait => {
      const traitEff: TraitEffect = TraitEffects[trait];
      if (!traitEff.triggers || !traitEff.triggers[TraitTrigger.Spawn]) { return; }

      traitEff.triggers[TraitTrigger.Spawn]({ hero });
    });

    return hero;
  }

  generateProspectiveHero(town: IGameTown): ProspectiveHero {

    const guildHallLevel = town.buildings[Building.GuildHall].level || 1;

    const hero = this.generateHero(town);

    return {
      hero,
      cost: hero.stats[HeroStat.LVL] * guildHallLevel * guildHallLevel * JobEffects[hero.job].statGrowth[HeroStat.GOLD](),
      rating: this.getRatingForHero(town, hero)
    };
  }

  private getRatingForHero(town: IGameTown, hero: Hero): number {
    const guildHallLevel = town.buildings[Building.GuildHall].level || 1;

    const maxStats = {};

    const jobStatic: HeroJobStatic = JobEffects[hero.job];

    // these stats contribute to the star rating
    const contributingStats = [HeroStat.ATK, HeroStat.DEF, HeroStat.HP, HeroStat.SP, HeroStat.STA];

    // calculate the max for each stat
    Object.values(contributingStats).forEach(stat => {
      if (maxStats[stat]) { return; }
      maxStats[stat] = hero.stats[HeroStat.LVL] * jobStatic.statGrowth[stat]() * jobStatic.statBaseMultiplier[stat];
    });

    // normalize the stats between 1-5 (if it goes over, that's ok)
    const pctStats = {};
    Object.keys(maxStats).forEach(stat => {
      pctStats[stat] = hero.stats[stat] / maxStats[stat] * 5;
    });

    // average the stat values that are normalized
    const avgStatPct = Math.max(1, sum(Object.values(pctStats)) / contributingStats.length);

    // normalize the stars to the guild hall level
    const statPctComparedToGuildHallLevel = avgStatPct * (hero.stats[HeroStat.LVL] / guildHallLevel);

    return statPctComparedToGuildHallLevel;
  }
}
