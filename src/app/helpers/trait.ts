import { HeroStat, Hero } from '../interfaces';

export function ensureHeroStatValue(hero: Hero, stat: HeroStat, valueAtLeast = 0): void {
  hero.stats[stat] = Math.floor(Math.max(hero.stats[stat], valueAtLeast));
}
