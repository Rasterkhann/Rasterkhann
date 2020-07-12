
import { WeaponElement, WeaponSubType, HeroAction } from '../interfaces';
import * as WeaponActions from './actions';

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
  [WeaponSubType.Knife]: [WeaponActions.EarnGold(100)],
  [WeaponSubType.Katar]: [],
  [WeaponSubType.Hatchet]: [],
  [WeaponSubType.Spear]: [WeaponActions.AttackSinglePercent(5)],
  [WeaponSubType.Mace]: [],
  [WeaponSubType.Staff]: [],
  [WeaponSubType.Shuriken]: [WeaponActions.AttackAllPercent(3)],
  [WeaponSubType.Wand]: [WeaponActions.HealPercent(10)],
  [WeaponSubType.Arrow]: [],
  [WeaponSubType.Shortbow]: [WeaponActions.AttackAllDiminishing()],
  [WeaponSubType.Longbow]: [WeaponActions.AttackAllDiminishing()]
};
