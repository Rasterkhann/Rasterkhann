import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { GameTown, Building, ProspectiveHero, Hero, HeroStat, HeroTrackedStat } from '../interfaces';
import { SpendGold, RerollHeroes, HeroRecruit, HeroGainEXP, HeroQueueDismissCancel,
  HeroQueueDismiss, HeroDismiss, HeroQueueRetire, HeroRetire, HeroQueueRetireCancel, HeroQueueRecruit, HeroQueueRecruitCancel } from '../actions';
import { HeroService } from './hero.service';
import { getCurrentStat, canHeroGoOnAdventure, isHeroFullHealth } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class GuildHallService {

  constructor(private store: Store, private heroCreator: HeroService) {}

  public canRerollHeroes(town: GameTown): boolean {
    const cost = this.heroRerollCost(town);
    return town.gold >= cost;
  }

  public heroRerollCost(town: GameTown): bigint {
    return BigInt(town.buildings[Building.GuildHall].level * 100);
  }

  public rerollProspectiveHeroes(town: GameTown, doesCost = true): void {
    if (doesCost) {
      if (!this.canRerollHeroes(town)) { return; }

      const cost = this.heroRerollCost(town);
      this.store.dispatch(new SpendGold(cost));
    }

    this.store.dispatch(new RerollHeroes());
  }

  public canRecruitHero(town: GameTown, prosHero: ProspectiveHero): boolean {
    return town.gold >= prosHero.cost;
  }

  public recruitHero(town: GameTown, prosHero: ProspectiveHero): void {
    if (!this.canRecruitHero(town, prosHero)) { return; }

    this.store.dispatch(new HeroRecruit(prosHero.hero.uuid)).subscribe(() => {
      this.store.dispatch(new SpendGold(prosHero.cost));
    });
  }

  public canTrainHero(town: GameTown, hero: Hero): boolean {
    if (!hero) { return false; }

    if (hero.onAdventure) { return false; }

    if (hero.stats[HeroStat.LVL] >= town.buildings[Building.GuildHall].level) { return false; }

    const cost = this.heroCreator.heroTrainCost(town, hero);
    if (town.gold < cost) { return false; }

    return true;
  }

  public trainHero(town: GameTown, hero: Hero): void {
    if (!this.canTrainHero(town, hero)) { return; }

    const expNeeded = hero.stats[HeroStat.EXP] - getCurrentStat(hero, HeroStat.EXP);
    const cost = this.heroCreator.heroTrainCost(town, hero);

    this.store.dispatch(new HeroGainEXP(hero.uuid, expNeeded))
      .subscribe(() => {
        this.store.dispatch(new SpendGold(cost));
      });
  }

  public cancelHeroDismiss(hero: Hero): void {
    this.store.dispatch(new HeroQueueDismissCancel(hero.uuid));
  }

  public dismissHero(town: GameTown, hero: Hero): void {
    if (hero.onAdventure) {
      this.store.dispatch(new HeroQueueDismiss(hero.uuid));
      return;
    }

    this.store.dispatch(new HeroDismiss(hero.uuid));
  }

  public queueRecruit(prosHero: ProspectiveHero): void {
    this.store.dispatch(new HeroQueueRecruit(prosHero.hero.uuid));
  }

  public cancelQueueRecruit(prosHero: ProspectiveHero): void {
    this.store.dispatch(new HeroQueueRecruitCancel(prosHero.hero.uuid));
  }

  // retire functions
  public canRetireHero(hero: Hero): boolean {
    return !hero.queueRetired && !hero.queueDismissed && hero.trackedStats[HeroTrackedStat.EncountersSucceeded] >= 100;
  }

  public retireHero(hero: Hero): void {
    if (hero.onAdventure) {
      this.store.dispatch(new HeroQueueRetire(hero.uuid));
      return;
    }

    this.store.dispatch(new HeroRetire(hero.uuid));
  }

  public cancelHeroRetire(hero: Hero): void {
    this.store.dispatch(new HeroQueueRetireCancel(hero.uuid));
  }

  public heroStatus(hero: Hero): string {
    if (hero.currentlyWorkingAt)                        { return `Working at the ${hero.currentlyWorkingAt}`; }
    if (hero.onAdventure)                               { return 'Adventuring'; }
    if (hero.queueAdventure && isHeroFullHealth(hero))  { return 'Waiting for Quest'; }
    if (!canHeroGoOnAdventure(hero))                    { return 'Resting'; }
    return 'Idle';
  }
}
