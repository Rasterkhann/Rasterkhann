import { Injectable } from '@angular/core';

import { sum } from 'lodash';

import { Hero, IGameTown, ProspectiveHero, HeroStat,
  Building, HeroJobStatic, Adventure, Trait, TraitValueMultipliers } from '../interfaces';
import { calculateHeroTrainingGoldPerXP, generateHero, generateMonster, getCurrentStat } from '../helpers';
import { JobEffects, TraitEffects } from '../static';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  generateMonster(town: IGameTown, adventure: Adventure): Hero {
    return generateMonster(town, adventure);
  }

  generateHero(town: IGameTown): Hero {
    return generateHero(town);
  }

  // trait average value prop multiplier - all bad means the cost goes down, all good means it goes up
  getTraitTotalMultiplier(traits: Trait[]): number {
    return sum(traits.map(t => {
      const trait = TraitEffects[t];
      return TraitValueMultipliers[trait.valueProp];
    })) / traits.length;
  }

  generateProspectiveHero(town: IGameTown): ProspectiveHero {

    const guildHallLevel = town.buildings[Building.GuildHall].level || 1;

    const hero = this.generateHero(town);
    const rating = this.getRatingForHero(town, hero);

    const baseCost = rating
                   * hero.stats[HeroStat.LVL]
                   * guildHallLevel
                   * this.getTraitTotalMultiplier(hero.traits)
                   * JobEffects[hero.job].costMultiplier
                   * (JobEffects[hero.job].statGrowth[HeroStat.GOLD]() || 1);

    return {
      hero,
      cost: BigInt(Math.floor(baseCost)),
      rating
    };
  }

  heroTrainCost(town: IGameTown, hero: Hero): bigint {
    return BigInt(Math.floor(hero.stats[HeroStat.EXP] - getCurrentStat(hero, HeroStat.EXP))) * calculateHeroTrainingGoldPerXP(town);
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
    const contributingStatTotal = contributingStats.map(x => pctStats[x]);
    const avgStatPct = Math.max(1, sum(contributingStatTotal) / contributingStats.length);

    // normalize the stars to the guild hall level
    const statPctComparedToGuildHallLevel = avgStatPct * (hero.stats[HeroStat.LVL] / guildHallLevel);

    return statPctComparedToGuildHallLevel;
  }
}
