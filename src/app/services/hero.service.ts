import { Injectable } from '@angular/core';

import { shuffle, take, random, sum, noop } from 'lodash';

import { Hero, IGameTown, ProspectiveHero, TraitPriority,
  HeroStat, Building, HeroJobStatic, TraitEffect, TraitTrigger, Trait } from '../interfaces';
import { calculateAvailableJobs, calculateMaxNumberOfTraits, calculateAvailableTraits, ensureHeroStatValue } from '../helpers';
import { JobEffects, TraitEffects } from '../static';

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
    const traits: Trait[] = [];

    const jobStatic: HeroJobStatic = JobEffects[job];

    // pick traits
    if (numTraits > 1) {
      traits.push(...take(shuffle(allTraits.filter(t => TraitEffects[t].priority !== TraitPriority.Last)), numTraits - 1));
    }

    traits.push(...take(shuffle(allTraits.filter(t => TraitEffects[t].priority === TraitPriority.Last))));

    // pick a hero level
    const heroLevel = random(1, guildHallLevel);

    const stats: Partial<Record<HeroStat, number>> = {
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

    // make sure heroes have at least a base of stats before they get ruined by traits
    ensureHeroStatValue(hero, HeroStat.LVL,  1);
    ensureHeroStatValue(hero, HeroStat.ATK,  1);
    ensureHeroStatValue(hero, HeroStat.DEF,  1);
    ensureHeroStatValue(hero, HeroStat.HP,   50);
    ensureHeroStatValue(hero, HeroStat.SP,   10);
    ensureHeroStatValue(hero, HeroStat.STA,  10);
    ensureHeroStatValue(hero, HeroStat.GOLD, 0);
    ensureHeroStatValue(hero, HeroStat.EXP,  100);

    // do onSpawn for all traits
    traits.forEach(trait => {
      const traitEff: TraitEffect = TraitEffects[trait];
      if (!traitEff.triggers || !traitEff.triggers[TraitTrigger.Spawn]) { return; }

      (traitEff.triggers[TraitTrigger.Spawn] || noop)({ hero });
    });

    return hero;
  }

  generateProspectiveHero(town: IGameTown): ProspectiveHero {

    const guildHallLevel = town.buildings[Building.GuildHall].level || 1;

    const hero = this.generateHero(town);
    const rating = this.getRatingForHero(town, hero);

    const baseCost = rating * hero.stats[HeroStat.LVL] * guildHallLevel * guildHallLevel * JobEffects[hero.job].statGrowth[HeroStat.GOLD]();

    return {
      hero,
      cost: BigInt(Math.floor(baseCost)),
      rating
    };
  }

  private getRatingForHero(town: IGameTown, hero: Hero): number {
    const guildHallLevel = town.buildings[Building.GuildHall].level || 1;

    if (guildHallLevel < 5) { return 0.5; }

    const maxStats: Record<HeroStat, number> = {
      [HeroStat.LVL]: 0,
      [HeroStat.EXP]: 0,
      [HeroStat.GOLD]: 0,
      [HeroStat.ATK]: 0,
      [HeroStat.DEF]: 0,
      [HeroStat.HP]: 0,
      [HeroStat.SP]: 0,
      [HeroStat.STA]: 0
    };

    const jobStatic: HeroJobStatic = JobEffects[hero.job];

    // these stats contribute to the star rating
    const contributingStats = [HeroStat.ATK, HeroStat.DEF, HeroStat.HP, HeroStat.SP, HeroStat.STA];

    // calculate the max for each stat
    Object.values(contributingStats).forEach(stat => {
      if (maxStats[stat]) { return; }
      maxStats[stat] = hero.stats[HeroStat.LVL] * jobStatic.statGrowth[stat]() * jobStatic.statBaseMultiplier[stat];
    });

    // normalize the stats between 1-5 (if it goes over, that's ok)
    const pctStats: Partial<Record<HeroStat, number>> = {};
    Object.keys(maxStats).forEach((stat: HeroStat) => {
      pctStats[stat] = hero.stats[stat] / maxStats[stat] * 5;
    });

    // average the stat values that are normalized
    const avgStatPct = Math.max(1, sum(Object.values(pctStats)) / contributingStats.length);

    // normalize the stars to the guild hall level
    const statPctComparedToGuildHallLevel = avgStatPct * (hero.stats[HeroStat.LVL] / guildHallLevel);

    return statPctComparedToGuildHallLevel;
  }
}
