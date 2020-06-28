import { IGameState } from '../interfaces';

export class ChooseInfo {
  static readonly type = '[Info] Choose Info';
  constructor(public window: string) {}
}

export class LoadSaveData {
  static readonly type = '[SaveData] Load Save';
  constructor(public gamestate: IGameState) {}
}
