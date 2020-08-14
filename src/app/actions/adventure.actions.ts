
import { Adventure, Hero } from '../interfaces';

export class RerollAdventures {
  static readonly type = '[Adventure] Reroll Adventures';
  constructor() {}
}

export class StartAdventure {
  static readonly type = '[Adventure] Start Adventure';
  constructor(public adventureId: string, public heroIds: string[]) {}
}

export class QueueAdventure {
  static readonly type = '[Adventure] Queue Adventure';
  constructor(public adventure: Adventure, public heroes: Hero[]) {}
}

export class RollLegendaryAdventure {
  static readonly type = '[Adventure] Roll Legendary Adventure';
  constructor() {}
}
