
import { WeaponElement, WeaponSubType, HeroAction } from '../interfaces';
import * as WeaponActions from './actions';

// TODO: add some
export const ElementActions: Record<WeaponElement, HeroAction[]> = {
  [WeaponElement.Iron]: [],
  [WeaponElement.Fire]: [],
  [WeaponElement.Ice]: [],
  [WeaponElement.Wind]: [],
  [WeaponElement.Earth]: [],
  [WeaponElement.Lightning]: [],
  [WeaponElement.Shadetin]: [],
  [WeaponElement.Darksteel]: [],
  [WeaponElement.Brightgold]: [],
  [WeaponElement.Obsidiron]: [],
  [WeaponElement.Melfrost]: []
};

export const SubTypeActions: Record<WeaponSubType, HeroAction[]> = {
  [WeaponSubType.Sword]: [],
  [WeaponSubType.Knife]: [],
  [WeaponSubType.Katar]: [],
  [WeaponSubType.Hatchet]: [],
  [WeaponSubType.Spear]: [],
  [WeaponSubType.Mace]: [],
  [WeaponSubType.Staff]: [],
  [WeaponSubType.Shuriken]: [],
  [WeaponSubType.Wand]: [],
  [WeaponSubType.Arrow]: [],
  [WeaponSubType.Shortbow]: [],
  [WeaponSubType.Longbow]: []
};
