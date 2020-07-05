
import { Adventure, Hero } from '../interfaces';

export class RerollAdventures {
  static readonly type = '[Adventure] Reroll Adventures';
  constructor() {}
}

export class StartAdventure {
  static readonly type = '[Adventure] Start Adventure';
  constructor(public adventure: Adventure, public heroes: Hero[]) {}
}
