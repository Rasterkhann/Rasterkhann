import { Injectable } from '@angular/core';

import { GameTown, SkillBook } from '../interfaces';
import { generateSkillBook } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  generateBook(town: GameTown): SkillBook {
    return generateSkillBook(town);
  }

}
