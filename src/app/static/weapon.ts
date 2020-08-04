
import { WeaponElement, WeaponSubType, HeroAction } from '../interfaces';
import * as WeaponActions from './actions';
import * as WeaponActionMessages from './action-messages';

export const ElementActions: Record<WeaponElement, HeroAction[]> = {
  [WeaponElement.Iron]: [],
  [WeaponElement.Fire]: [
    WeaponActions.Attack(WeaponActionMessages.FireAttackMessage, { defMultiplier: 0.1, spCost: 500, staCost: 300 })
  ],
  [WeaponElement.Ice]: [
    WeaponActions.AttackSinglePercent(WeaponActionMessages.IceAttackMessage, { pct: 25, spCost: 500, staCost: 200 })
  ],
  [WeaponElement.Wind]: [
    WeaponActions.Attack(WeaponActionMessages.WindAttackMessage, { times: 4, spCost: 300, staCost: 100 })
  ],
  [WeaponElement.Earth]: [
    WeaponActions.HealPercent(WeaponActionMessages.EarthHealMessage, { pct: 20, spCost: 400, staCost: 500 })
  ],
  [WeaponElement.Lightning]: [
    WeaponActions.AttackSomeOrAllDiminishing(WeaponActionMessages.LightningAttackMessage)
  ],
  [WeaponElement.Shadetin]: [],
  [WeaponElement.Darksteel]: [],
  [WeaponElement.Brightgold]: [],
  [WeaponElement.Obsidiron]: [],
  [WeaponElement.Melfrost]: []
};

export const SubTypeActions: Record<WeaponSubType, HeroAction[]> = {
  [WeaponSubType.Sword]: [],
  [WeaponSubType.Knife]: [
    WeaponActions.EarnGold(WeaponActionMessages.FindGoldMessage, { gold: 100, spCost: 30, staCost: 15 })
  ],
  [WeaponSubType.Katar]: [],
  [WeaponSubType.Hatchet]: [],
  [WeaponSubType.Spear]: [
    WeaponActions.AttackSinglePercent(WeaponActionMessages.ThrustMessage, { pct: 5, spCost: 25, staCost: 10 })
  ],
  [WeaponSubType.Mace]: [],
  [WeaponSubType.Staff]: [],
  [WeaponSubType.Shuriken]: [
    WeaponActions.Attack(WeaponActionMessages.FlingShurikenMessage, { times: 3, spCost: 50, staCost: 15 })
  ],
  [WeaponSubType.Wand]: [
    WeaponActions.HealPercent(WeaponActionMessages.HealMessage, { pct: 10, spCost: 50, staCost: 20 })
  ],
  [WeaponSubType.Arrow]: [],
  [WeaponSubType.Shortbow]: [
    WeaponActions.AttackSomeOrAllDiminishing(WeaponActionMessages.ShootArrowsMessage)
  ],
  [WeaponSubType.Longbow]: [
    WeaponActions.AttackSomeOrAllDiminishing(WeaponActionMessages.ShootArrowsMessage)
  ]
};
