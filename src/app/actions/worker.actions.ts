import { Building } from '../interfaces';

export class AllocateAllToBuilding {
  static readonly type = '[Worker] Allocate All To Building';
  constructor(public building: Building) {}
}

export class UnallocateAllFromBuilding {
  static readonly type = '[Worker] Unallocate All From Building';
  constructor(public building: Building) {}
}

export class AllocateSomeToBuilding {
  static readonly type = '[Worker] Allocate Some To Building';
  constructor(public building: Building, public num: number) {}
}

export class ChangeWorkerAutoAllocationBuilding {
  static readonly type = '[Worker] Change Auto-Allocate Building';
  constructor(public building: Building | null) {}
}
