import { WeaponElement, WeaponSubType, HeroStat } from '../interfaces';


export const WEAPON_BASIC_SPRITE_INFO_TYPE: Record<WeaponElement, number> = {
  [WeaponElement.Iron]: 0,
  [WeaponElement.Fire]: 1,
  [WeaponElement.Ice]: 2,
  [WeaponElement.Wind]: 3,
  [WeaponElement.Earth]: 4,
  [WeaponElement.Lightning]: 5,
  [WeaponElement.Shadetin]: 6,
  [WeaponElement.Darksteel]: 7,
  [WeaponElement.Brightgold]: 8,
  [WeaponElement.Obsidiron]: 9,
  [WeaponElement.Melfrost]: 10
};

export const WEAPON_BASIC_SPRITE_INFO_WEAPON: Record<WeaponSubType, number> = {
  [WeaponSubType.Sword]: 0,
  [WeaponSubType.Knife]: 1,
  [WeaponSubType.Katar]: 2,
  [WeaponSubType.Hatchet]: 3,
  [WeaponSubType.Spear]: 4,
  [WeaponSubType.Mace]: 5,
  [WeaponSubType.Staff]: 6,
  [WeaponSubType.Shuriken]: 7,
  [WeaponSubType.Wand]: 8,
  [WeaponSubType.Arrow]: 9,
  [WeaponSubType.Shortbow]: 10,
  [WeaponSubType.Longbow]: 11
};

export const WEAPON_TYPE_BASE_STATS: Record<WeaponSubType, Partial<Record<HeroStat, number>>> = {
  [WeaponSubType.Sword]:    { [HeroStat.ATK]: 5 },
  [WeaponSubType.Knife]:    { [HeroStat.ATK]: 3, [HeroStat.STA]: 2 },
  [WeaponSubType.Katar]:    { [HeroStat.ATK]: 4, [HeroStat.DEF]: 2 },
  [WeaponSubType.Hatchet]:  { [HeroStat.ATK]: 4, [HeroStat.HP]: 2 },
  [WeaponSubType.Spear]:    { [HeroStat.ATK]: 2, [HeroStat.DEF]: 4 },
  [WeaponSubType.Mace]:     { [HeroStat.ATK]: 1, [HeroStat.DEF]: 4, [HeroStat.STA]: 2 },
  [WeaponSubType.Staff]:    { [HeroStat.DEF]: 3, [HeroStat.STA]: 2, [HeroStat.SP]: 4 },
  [WeaponSubType.Shuriken]: { [HeroStat.ATK]: 1, [HeroStat.STA]: 5 },
  [WeaponSubType.Wand]:     { [HeroStat.ATK]: 3, [HeroStat.DEF]: 4, [HeroStat.SP]: 3 },
  [WeaponSubType.Arrow]:    {},
  [WeaponSubType.Shortbow]: { [HeroStat.ATK]: 3, [HeroStat.SP]: 2,  [HeroStat.STA]: 2 },
  [WeaponSubType.Longbow]:  { [HeroStat.ATK]: 4, [HeroStat.DEF]: 2, [HeroStat.STA]: 1 }
};

export const WEAPON_ELEMENT_BASE_STATS: Record<WeaponElement, Partial<Record<HeroStat, number>>> = {
  [WeaponElement.Iron]:       { [HeroStat.ATK]: 3 },

  [WeaponElement.Fire]:       { [HeroStat.SP]: 10, [HeroStat.ATK]: 5 },
  [WeaponElement.Ice]:        { [HeroStat.SP]: 10, [HeroStat.DEF]: 5 },
  [WeaponElement.Wind]:       { [HeroStat.SP]: 10, [HeroStat.HP]:  20 },
  [WeaponElement.Earth]:      { [HeroStat.SP]: 10, [HeroStat.DEF]: 5 },
  [WeaponElement.Lightning]:  { [HeroStat.SP]: 10, [HeroStat.STA]: 5 },

  [WeaponElement.Shadetin]:   { [HeroStat.ATK]: 5, [HeroStat.DEF]: 4 },
  [WeaponElement.Darksteel]:  { [HeroStat.ATK]: 5, [HeroStat.STA]: 3 },
  [WeaponElement.Brightgold]: { [HeroStat.ATK]: 2, [HeroStat.DEF]: 2, [HeroStat.SP]: 4 },
  [WeaponElement.Obsidiron]:  { [HeroStat.DEF]: 5, [HeroStat.STA]: 3 },
  [WeaponElement.Melfrost]:   { [HeroStat.ATK]: 5, [HeroStat.SP]: 10 }
};
