
import { ProspectiveHero, Hero } from '../interfaces';

export class RerollHeroes {
  static readonly type = '[Hero] Reroll Heroes';
  constructor() {}
}

export class RecruitHero {
  static readonly type = '[Hero] Recruit Hero';
  constructor(public hero: ProspectiveHero) {}
}

export class DismissHero {
  static readonly type = '[Hero] Dismiss Hero';
  constructor(public hero: Hero) {}
}
