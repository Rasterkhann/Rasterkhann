
import { HeroActionReplaceOpts, HeroActionStringReplacer } from '../interfaces';
import { formatNumber, getHeroTag } from '../helpers/global';

const valueReplacer = (str: string, opts: HeroActionReplaceOpts): string => {
  let base = str
    .split('%source%').join(getHeroTag(opts.source))
    .split('%target%').join(opts.target.name);

  // parse out and replace keys like value, value1, valuegold, etc
  Object.keys(opts).forEach((key: keyof HeroActionReplaceOpts) => {
    if (!key.includes('value')) { return; }

    base = base.split(`%${key}%`).join(formatNumber(opts[key] as number));
  });

  return base;
};

export const AttackMessage: HeroActionStringReplacer = {
  replace: (opts: HeroActionReplaceOpts) => {
    return valueReplacer(`%source% attacked %target% for %value% damage!`, opts);
  }
};

export const MagicMissileMessage: HeroActionStringReplacer = {
  replace: (opts: HeroActionReplaceOpts) => {
    return valueReplacer(`%source% cast magic missile at %target% for %value% damage!`, opts);
  }
};

export const FireballMessage: HeroActionStringReplacer = {
  replace: (opts: HeroActionReplaceOpts) => {
    return valueReplacer(`%source% cast fireball at %target% for %value% damage!`, opts);
  }
};

export const AcidSprayMessage: HeroActionStringReplacer = {
  replace: (opts: HeroActionReplaceOpts) => {
    return valueReplacer(`%source% sprayed acid at %target% for %value% damage!`, opts);
  }
};

export const CleaveMessage: HeroActionStringReplacer = {
  replace: (opts: HeroActionReplaceOpts) => {
    return valueReplacer(`%source% cleaved %target% for %value% damage!`, opts);
  }
};

export const ShootArrowsMessage: HeroActionStringReplacer = {
  replace: (opts: HeroActionReplaceOpts) => {
    return valueReplacer(`%source% shot arrows at %target% for %value% damage!`, opts);
  }
};

export const FlingShurikenMessage: HeroActionStringReplacer = {
  replace: (opts: HeroActionReplaceOpts) => {
    return valueReplacer(`%source% flung shuriken at %target% for %value% damage!`, opts);
  }
};

export const HamstringMessage: HeroActionStringReplacer = {
  replace: (opts: HeroActionReplaceOpts) => {
    return valueReplacer(`%source% hamstringed %target% for %value% damage!`, opts);
  }
};

export const ThrustMessage: HeroActionStringReplacer = {
  replace: (opts: HeroActionReplaceOpts) => {
    return valueReplacer(`%source% thrusted their weapon at %target% for %value% damage!`, opts);
  }
};

export const HealMessage: HeroActionStringReplacer = {
  replace: (opts: HeroActionReplaceOpts) => {
    return valueReplacer(`%source% healed %target% for %value% HP!`, opts);
  }
};

export const FindGoldMessage: HeroActionStringReplacer = {
  replace: (opts: HeroActionReplaceOpts) => {
    return valueReplacer(`%source% found %value% GOLD!`, opts);
  }
};

export const MugMessage: HeroActionStringReplacer = {
  replace: (opts: HeroActionReplaceOpts) => {
    return valueReplacer(`%source% mugged %target% dealing %value% damage and finding %valuegold% GOLD!`, opts);
  }
};
