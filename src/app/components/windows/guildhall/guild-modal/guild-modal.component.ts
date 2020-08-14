import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Select } from '@ngxs/store';

import { sum } from 'lodash';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { GameState } from '../../../../states';
import { ProspectiveHero, Hero, GameTown, HeroStat, Trait, ItemType, HeroItem, SkillBook } from '../../../../interfaces';
import { GameService, HeroService } from '../../../../services';
import { allEquippableArmorClasses, allEquippableWeapons, calculateHeroMaxTotal, formatNumber, skillBookOptsPoints } from '../../../../helpers';
import { JobEffects, TraitEffects } from '../../../../static';

@Component({
  selector: 'app-guild-modal',
  templateUrl: './guild-modal.component.html',
  styleUrls: ['./guild-modal.component.scss'],
})
export class GuildModalComponent implements OnDestroy, OnInit {

  @Select(GameState.currentTown) currentTown$: Observable<GameTown>;
  @Select(GameState.currentTownProspectiveHeroes) prospectiveHeroes$: Observable<ProspectiveHero[]>;
  @Select(GameState.currentTownRecruitedHeroes) recruitedHeroes$: Observable<Hero[]>;

  private canBuyHeroes: boolean;
  private activeHeroes$: Subscription;
  public anyHeroesReadyToRetire: boolean;

  public town: GameTown;

  public get maxHeroes(): number {
    return calculateHeroMaxTotal(this.town);
  }

  public get itemTypes(): ItemType[] {
    return [ItemType.Weapon, ItemType.Armor, ItemType.Potion];
  }

  public get viewingHeroJobDescription(): string {
    if (!this.viewingHero) { return ''; }
    return JobEffects[this.viewingHero.job].description;
  }

  public viewingProspectiveHero: ProspectiveHero | null;
  public viewingHero: Hero | null;

  constructor(
    private modal: ModalController,
    public game: GameService,
    public heroCreator: HeroService
  ) { }

  ngOnInit(): void {
    this.activeHeroes$ = combineLatest([this.currentTown$, this.recruitedHeroes$, this.prospectiveHeroes$])
      .subscribe(([town, d, prospectives]) => {
        this.town = town;

        if (this.viewingProspectiveHero && this.viewingHero && d.map(h => h.uuid).includes(this.viewingHero.uuid)) {
          this.viewingProspectiveHero = null;
        }

        this.canBuyHeroes = d.length < calculateHeroMaxTotal(this.town);
        this.anyHeroesReadyToRetire = d.some(h => this.game.canRetireHero(h));

        d.forEach(h => {
          if (!this.viewingHero || h.uuid !== this.viewingHero.uuid) { return; }
          this.viewingHero = h;
        });

        prospectives.forEach(p => {
          if (!this.viewingProspectiveHero || p.hero.uuid !== this.viewingProspectiveHero.hero.uuid) { return; }
          this.viewingProspectiveHero = p;
        });
      });
  }

  ngOnDestroy(): void {
    if (this.activeHeroes$) { this.activeHeroes$.unsubscribe(); }
  }

  trackHeroBy(hero: Hero): string {
    return hero.uuid;
  }

  dismiss(): void {
    this.modal.dismiss();
  }

  canHeroBeBought(prosHero: ProspectiveHero): boolean {
    return this.town.gold > prosHero.cost && this.canBuyHeroes;
  }

  rerollHeroes(town: GameTown): void {
    setTimeout(() => {
      this.game.rerollProspectiveHeroes(town, true);
    }, 100);
  }

  getHeroGearTypeItems(hero: Hero, type: ItemType): HeroItem[] {
    return hero.gear[type].filter(Boolean);
  }

  getTraitData(trait: Trait): string {
    return TraitEffects[trait].description;
  }

  getAllWeaponsForViewingHero(): string[] {
    if (!this.viewingHero) { return []; }

    return allEquippableWeapons(this.town, this.viewingHero);
  }

  getAllArmorsForViewingHero(): string[] {
    if (!this.viewingHero) { return []; }

    return allEquippableArmorClasses(this.town, this.viewingHero);
  }

  dismissCurrentHero(): void {
    if (!this.viewingHero) { return; }
    this.dismissHero(this.viewingHero);
  }

  trainCurrentHero(): void {
    if (!this.viewingHero) { return; }
    this.trainHero(this.viewingHero);
  }

  recruitCurrentHero(): void {
    if (!this.viewingProspectiveHero || !this.viewingHero) { return; }
    this.recruitHero(this.viewingProspectiveHero);
  }

  canRecruitHero(town: GameTown, prosHero: ProspectiveHero): boolean {
    return this.canBuyHeroes && this.game.canRecruitHero(town, prosHero);
  }

  async trainHero(hero: Hero): Promise<void> {
    const cost = this.heroCreator.heroTrainCost(this.town, hero);

    const finalize = () => {
      if (!this.game.canTrainHero(this.town, hero)) { return; }
      this.game.trainHero(this.town, hero);
    };

    this.game.doSimpleConfirmation({
      header: 'Train Hero',
      message: `Are you sure you want to train ${hero.name} to the level ${hero.stats[HeroStat.LVL] + 1} ${hero.job}?
       It will cost ${formatNumber(cost)} gold.`,
      confirmText: 'Yes, Train'
    }, finalize);
  }

  async dismissHero(hero: Hero): Promise<void> {
    const finalize = () => {
      if (hero.queueRetired || hero.queueDismissed) { return; }
      this.game.dismissHero(this.town, hero);

      // cancelable more easily
      if (!hero.onAdventure) {
        this.viewingHero = null;
      }
    };

    this.game.doSimpleConfirmation({
      header: 'Dismiss Hero',
      message: `Are you sure you want to dismiss ${hero.name}, the level ${hero.stats[HeroStat.LVL]} ${hero.job}?

      ${hero.onAdventure ? 'This hero will be dismissed upon adventure completion.' : ''}`,
      confirmText: 'Yes, Dismiss'
    }, finalize);
  }

  async recruitHero(prosHero: ProspectiveHero): Promise<void> {
    const finalize = () => {
      if (!prosHero.rating || !prosHero.cost) { return; }

      if (!this.canBuyHeroes) {
        this.game.queueRecruit(prosHero);
        return;
      }

      this.game.recruitHero(this.town, prosHero);
    };

    this.game.doSimpleConfirmation({
      header: 'Recruit Hero',
      message: `Are you sure you want to recruit ${prosHero.hero.name}, the level ${prosHero.hero.stats[HeroStat.LVL]} ${prosHero.hero.job}?

      ${this.canBuyHeroes ? '' : '<br><br>This hero will be queued for recruitment, and will not be lost to rerolls.'}
      `,
      confirmText: 'Yes, Recruit'
    }, finalize);
  }

  async retireHero(hero: Hero): Promise<void> {
    const finalize = () => {
      if (hero.queueRetired || hero.queueDismissed) { return; }
      this.game.retireHero(hero);

      if (!hero.onAdventure) {
        this.viewingHero = null;
      }
    };

    this.game.doSimpleConfirmation({
      header: 'Retire Hero',
      message: `Are you sure you want to retire ${hero.name}, the level ${hero.stats[HeroStat.LVL]} ${hero.job}?
      You will gain the ability to allocate this hero to a building, increasing that buildings capabilities.
      You will also gain a Job Crystal to symbolize this heros adventure.

      ${hero.onAdventure ? 'This hero will be retired upon adventure completion.' : ''}`,
      confirmText: 'Yes, Retire'
    }, finalize);
  }

  unviewHero(): void {
    this.viewingHero = null;
    this.viewingProspectiveHero = null;
  }

  viewHero(hero: Hero): void {
    this.viewingHero = hero;
  }

  viewProspectiveHero(prosHero: ProspectiveHero): void {
    this.viewingHero = prosHero.hero;
    this.viewingProspectiveHero = prosHero;
  }

  skillBookLP(book: SkillBook): number {
    return skillBookOptsPoints(book.actionOpts);
  }

  totalHeroLPAvailable(hero: Hero): number {
    return hero.stats[HeroStat.LVL] - sum(hero.learnedSkills.map(s => this.skillBookLP(s)));
  }

  learnableSkills(hero: Hero, books: SkillBook[]): SkillBook[] {
    return books.filter(b => !b.requiredJobs || b.requiredJobs.includes(hero.job));
  }

}
