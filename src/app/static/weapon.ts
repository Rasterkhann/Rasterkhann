
import { WeaponElement, WeaponSubType, HeroAction } from '../interfaces';
import * as WeaponActions from './actions';
import * as WeaponActionMessages from './action-messages';

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
  [WeaponSubType.Knife]: [WeaponActions.EarnGold(WeaponActionMessages.FindGoldMessage, 100)],
  [WeaponSubType.Katar]: [],
  [WeaponSubType.Hatchet]: [],
  [WeaponSubType.Spear]: [WeaponActions.AttackSinglePercent(WeaponActionMessages.ThrustMessage, 5)],
  [WeaponSubType.Mace]: [],
  [WeaponSubType.Staff]: [],
  [WeaponSubType.Shuriken]: [WeaponActions.AttackAllPercent(WeaponActionMessages.FlingShurikenMessage, 3)],
  [WeaponSubType.Wand]: [WeaponActions.HealPercent(WeaponActionMessages.HealMessage, 10)],
  [WeaponSubType.Arrow]: [],
  [WeaponSubType.Shortbow]: [WeaponActions.AttackAllDiminishing(WeaponActionMessages.ShootArrowsMessage)],
  [WeaponSubType.Longbow]: [WeaponActions.AttackAllDiminishing(WeaponActionMessages.ShootArrowsMessage)]
};
