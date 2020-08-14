
import { Building, ProspectiveHero } from '../interfaces';

export class RerollHeroes {
  static readonly type = '[Hero] Reroll Heroes';
  constructor() {}
}

export class HeroRecruit {
  static readonly type = '[Hero] Recruit Hero';
  constructor(public heroId: string) {}
}

export class HeroDismiss {
  static readonly type = '[Hero] Dismiss Hero';
  constructor(public heroId: string) {}
}

export class HeroQueueDismiss {
  static readonly type = '[Hero] Queue Dismiss';
  constructor(public heroId: string) {}
}

export class HeroQueueDismissCancel {
  static readonly type = '[Hero] Cancel Queue Dismiss';
  constructor(public heroId: string) {}
}

export class HeroGainEXP {
  static readonly type = '[Hero] Gain EXP';
  constructor(public heroId: string, public exp: number) {}
}

export class HeroGainGold {
  static readonly type = '[Hero] Gain Gold';
  constructor(public heroId: string, public gold: number) {}
}

export class HeroStartOddJob {
  static readonly type = '[Hero] Start Odd Job';
  constructor(public heroId: string) {}
}

export class HeroStopOddJob {
  static readonly type = '[Hero] Stop Odd Job';
  constructor(public heroId: string) {}
}

export class HeroSetLocation {
  static readonly type = '[Hero] Set Location';
  constructor(public heroId: string, public building: Building | null) {}
}

export class HeroSetDestination {
  static readonly type = '[Hero] Set Destination';
  constructor(public heroId: string, public building: Building | null) {}
}

export class HeroRetire {
  static readonly type = '[Hero] Do Retire';
  constructor(public heroId: string) {}
}

export class HeroQueueRetire {
  static readonly type = '[Hero] Queue Retire';
  constructor(public heroId: string) {}
}

export class HeroQueueRetireCancel {
  static readonly type = '[Hero] Cancel Queue Retire';
  constructor(public heroId: string) {}
}

export class HeroQueueRecruit {
  static readonly type = '[Hero] Queue Recruit';
  constructor(public heroId: string) {}
}

export class HeroQueueRecruitCancel {
  static readonly type = '[Hero] Cancel Queue Recruit';
  constructor(public heroId: string) {}
}

export class HeroLearnSkill {
  static readonly type = '[Hero] Learn Skill';
  constructor(public heroId: string, public bookId: string) {}
}

export class HeroForgetSkill {
  static readonly type = '[Hero] Forget Skill';
  constructor(public heroId: string, public bookId: string) {}
}
