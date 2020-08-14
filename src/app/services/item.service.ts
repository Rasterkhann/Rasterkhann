
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { HeroItem, GameTown, ItemType, HeroArmor, HeroWeapon, ArmorSubTypeWeight } from '../interfaces';
import { ScrapItem } from '../actions';
import { JobEffects } from '../static';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private store: Store) { }

  public scrapItem(item: HeroItem): void {
    this.store.dispatch(new ScrapItem(item));
  }

  public canAnyHeroesUseItem(town: GameTown, item: HeroItem): boolean {
    return town.recruitedHeroes.some(hero => {
      const weapons = JobEffects[hero.job].validWeaponTypes;
      const armors = JobEffects[hero.job].validArmorClasses;

      if (item.type === ItemType.Weapon) { return weapons.includes((item as HeroWeapon).subType); }
      if (item.type === ItemType.Armor) { return armors.includes(ArmorSubTypeWeight[(item as HeroArmor).subType]); }

      return true;
    });
  }

}
