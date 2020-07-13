import { HeroItem } from '../interfaces';

export class ScrapItem {
  static readonly type = '[Item] Scrap Item';
  constructor(public item: HeroItem) {}
}
