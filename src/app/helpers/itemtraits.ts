import { random, sample } from 'lodash';
import { HeroStat, IGameTown, ItemTrait } from '../interfaces';
import { filteredUnlocksEarnedByTown } from './global';

const ALL_TRAITS: Record<ItemTrait, Partial<Record<HeroStat, number>>> = {
  // def only
  Hard:       { [HeroStat.DEF]: 2 },
  Guarding:   { [HeroStat.DEF]: 5 },
  Armored:    { [HeroStat.DEF]: 10 },
  Warding:    { [HeroStat.DEF]: 20 },

  // atk only
  Jagged:     { [HeroStat.ATK]: 2 },
  Spiked:     { [HeroStat.ATK]: 5 },
  Angry:      { [HeroStat.ATK]: 10 },
  Menacing:   { [HeroStat.ATK]: 20 },

  // sta only
  Wild:       { [HeroStat.STA]: 2 },
  Rash:       { [HeroStat.STA]: 5 },
  Intrepid:   { [HeroStat.STA]: 10 },
  Violent:    { [HeroStat.STA]: 20 },

  // hp only
  Healthy:    { [HeroStat.HP]: 10 },
  Powerful:   { [HeroStat.HP]: 25 },
  Staunch:    { [HeroStat.HP]: 45 },
  Salubrious: { [HeroStat.HP]: 75 },

  // sp only
  Magical:    { [HeroStat.SP]: 5 },
  Arcane:     { [HeroStat.SP]: 15 },
  Mystic:     { [HeroStat.SP]: 25 },
  Celestial:  { [HeroStat.SP]: 40 },

  // hybrid

  // atk/def
  Forceful:   { [HeroStat.ATK]: 5, [HeroStat.DEF]: 3 },
  Keen:       { [HeroStat.ATK]: 7, [HeroStat.DEF]: 1 },
  Precise:    { [HeroStat.ATK]: 3, [HeroStat.DEF]: 5 },

  // atk/sta
  Sharp:      { [HeroStat.ATK]: 3, [HeroStat.STA]: 5 },
  Demonic:    { [HeroStat.ATK]: 5, [HeroStat.STA]: 3 },
  Deadly:     { [HeroStat.ATK]: 5, [HeroStat.STA]: 5 },

  // atk/hp
  Hurtful:    { [HeroStat.ATK]: 3, [HeroStat.HP]: 10 },
  Dangerous:  { [HeroStat.ATK]: 5, [HeroStat.HP]: 15 },
  Savage:     { [HeroStat.ATK]: 3, [HeroStat.HP]: 20 },

  // atk/sp
  Murderous:  { [HeroStat.ATK]: 7, [HeroStat.SP]: 5 },
  Zealous:    { [HeroStat.ATK]: 3, [HeroStat.SP]: 10 },

  // def/sta
  Large:      { [HeroStat.DEF]: 5,  [HeroStat.STA]: 10 },
  Massive:    { [HeroStat.DEF]: 10, [HeroStat.STA]: 5 },
  Gigantic:   { [HeroStat.DEF]: 7,  [HeroStat.STA]: 7 },

  // def/hp
  Adept:      { [HeroStat.DEF]: 5, [HeroStat.HP]: 20},

  // def/sp
  Manic:      { [HeroStat.DEF]: 5, [HeroStat.SP]: 10 },

  // sta/hp
  Pointy:     { [HeroStat.STA]: 2, [HeroStat.HP]: 10 },
  Strong:     { [HeroStat.STA]: 5, [HeroStat.HP]: 20 },

  // sta/sp
  Quick:      { [HeroStat.STA]: 5, [HeroStat.SP]: 10 },

  // hp/sp
  Masterful:  { [HeroStat.HP]: 30, [HeroStat.SP]: 15 },

  // more hybrid
  Superior:   { [HeroStat.ATK]: 10, [HeroStat.DEF]: 10, [HeroStat.STA]: 10 },
  Lucky:      { [HeroStat.ATK]: 5,  [HeroStat.DEF]: 5,  [HeroStat.HP]: 50, [HeroStat.SP]: 20, [HeroStat.STA]: 5},

  // hybrid bad/good
  Unpleasant: { [HeroStat.ATK]: 5,  [HeroStat.DEF]: -3 },
  Ruthless:   { [HeroStat.ATK]: 10, [HeroStat.DEF]: -5, [HeroStat.STA]: -5 },
  Bulky:      { [HeroStat.DEF]: 10, [HeroStat.ATK]: -5 },
  Heavy:      { [HeroStat.DEF]: 10, [HeroStat.STA]: -5 },
  Awkward:    { [HeroStat.STA]: -10, [HeroStat.HP]: 10 },

  // bad modifiers
  Small:      { [HeroStat.ATK]: -3 },
  Damaged:    { [HeroStat.DEF]: -3 },
  Annoying:   { [HeroStat.STA]: -3 },
  Slow:       { [HeroStat.SP]: -10 },
  Lazy:       { [HeroStat.HP]: -10 },

  Tiny:       { [HeroStat.ATK]: -5 },
  Sluggish:   { [HeroStat.DEF]: -5 },
  Dull:       { [HeroStat.ATK]: -7 },
  Broken:     { [HeroStat.DEF]: -7 },

  Deranged:   { [HeroStat.HP]: -30, [HeroStat.SP]: -15 },
  Inept:      { [HeroStat.SP]: -10, [HeroStat.STA]: -5 },
  Bad:        { [HeroStat.HP]: -5,  [HeroStat.SP]: -5 },
  Shoddy:     { [HeroStat.ATK]: -1, [HeroStat.DEF]: -1 },
  Awful:      { [HeroStat.ATK]: -5, [HeroStat.DEF]: -10, [HeroStat.STA]: -15 },
  Destroyed:  { [HeroStat.ATK]: -4, [HeroStat.DEF]: -3, [HeroStat.STA]: -5 },
  Terrible:   { [HeroStat.ATK]: -3, [HeroStat.DEF]: -3, [HeroStat.STA]: -3, [HeroStat.HP]: -10, [HeroStat.SP]: -10 },
};

export function chooseRandomItemTrait(town: IGameTown): { name: ItemTrait, stats: Partial<Record<HeroStat, number>> } | null {
  if (random(0, 10) <= 5) { return null; }

  const baseTraits: ItemTrait[] = [
    'Hard', 'Jagged', 'Wild', 'Magical', 'Healthy',
    'Small', 'Damaged', 'Annoying', 'Slow', 'Lazy'
  ];

  const earnedTraits: ItemTrait[] = filteredUnlocksEarnedByTown(town, 'itemTrait');

  const allTraits: ItemTrait[] = baseTraits.concat(earnedTraits);

  const chosenTrait = sample(allTraits);
  if (!chosenTrait) { return null; }

  return { name: chosenTrait, stats: ALL_TRAITS[chosenTrait] };
}
