
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

export class HeroGainEXP {
  static readonly type = '[Hero] Gain EXP';
  constructor(public hero: Hero, public exp: number) {}
}

export class HeroGainGold {
  static readonly type = '[Hero] Gain Gold';
  constructor(public hero: Hero, public gold: number) {}
}
