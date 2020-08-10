import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { GameTown, Building, SkillBook, Hero } from '../interfaces';
import { SpendGold, RerollBooks, BookBuy, BookDestroy, HeroLearnSkill, HeroForgetSkill } from '../actions';
import { calculateMaxOwnedBooks } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private store: Store) {}

  public canRerollBooks(town: GameTown): boolean {
    const cost = this.bookRerollCost(town);
    return town.gold >= cost;
  }

  public bookRerollCost(town: GameTown): bigint {
    return BigInt(town.buildings[Building.Library].level * 100);
  }

  public rerollBooks(town: GameTown, doesCost = true): void {
    if (doesCost) {
      if (!this.canRerollBooks(town)) { return; }

      const cost = this.bookRerollCost(town);
      this.store.dispatch(new SpendGold(cost));
    }

    this.store.dispatch(new RerollBooks());
  }

  public canBuyBook(town: GameTown, book: SkillBook): boolean {
    if (town.ownedBooks.length >= calculateMaxOwnedBooks(town)) { return false; }
    return town.gold >= book.cost;
  }

  public buyBook(town: GameTown, book: SkillBook): void {
    if (!this.canBuyBook(town, book)) { return; }

    this.store.dispatch(new BookBuy(book)).subscribe(() => {
      this.store.dispatch(new SpendGold(book.cost));
    });
  }

  public destroySkill(book: SkillBook): void {
    this.store.dispatch(new BookDestroy(book.uuid));
  }

  public learnSkill(hero: Hero, book: SkillBook): void {
    this.store.dispatch(new HeroLearnSkill(hero.uuid, book.uuid));
  }

  public forgetSkill(hero: Hero, book: SkillBook): void {
    this.store.dispatch(new HeroForgetSkill(hero.uuid, book.uuid));
  }
}
