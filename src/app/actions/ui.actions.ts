import { IGameState, GameOption } from '../interfaces';

export class ChooseInfo {
  static readonly type = '[Info] Choose Info';
  constructor(public window: string, public autoOpen: boolean) {}
}

export class OptionToggle {
  static readonly type = '[Option] Toggle Option';
  constructor(public option: GameOption) {}
}

export class NotifyMessage {
  static readonly type = '[Notification] New Notification';
  constructor(public notification: string) {}
}

export class LoadSaveData {
  static readonly type = '[SaveData] Load Save';
  constructor(public gamestate: IGameState) {}
}
