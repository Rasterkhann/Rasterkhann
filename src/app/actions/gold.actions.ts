
export class GainCurrentGold {
  static readonly type = '[Gold] Add Current Gold';
}

export class GainGold {
  static readonly type = '[Gold] Add Gold';
  constructor(public gold: bigint) {}
}

export class SpendGold {
  static readonly type = '[Gold] Spend Gold';
  constructor(public gold: bigint) {}
}
