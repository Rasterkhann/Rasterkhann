import { SkillBook } from '../interfaces';

export class RerollBooks {
  static readonly type = '[Book] Reroll Books';
  constructor() {}
}

export class BookBuy {
  static readonly type = '[Book] Buy Book';
  constructor(public book: SkillBook) {}
}

export class BookDestroy {
  static readonly type = '[Book] Destroy Book';
  constructor(public bookId: string) {}
}
