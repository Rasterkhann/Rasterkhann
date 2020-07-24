
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
  constructor(public heroId: string) {}
}

export class HeroGainEXP {
  static readonly type = '[Hero] Gain EXP';
  constructor(public heroId: string, public exp: number) {}
}

export class HeroGainGold {
  static readonly type = '[Hero] Gain Gold';
  constructor(public heroId: string, public gold: number) {}
}

export class HeroStartOddJob {
  static readonly type = '[Hero] Start Odd Job';
  constructor(public heroId: string) {}
}

export class HeroStopOddJob {
  static readonly type = '[Hero] Stop Odd Job';
  constructor(public heroId: string) {}
}
