import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GameOption } from '../../../interfaces';

@Component({
  selector: 'app-help-text',
  templateUrl: './help-text.component.html',
  styleUrls: ['./help-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpTextComponent implements OnInit {

  @Input() helpText: string;

  @Select((state: any) => state.gamestate.options[GameOption.ShowHelpText]) showHelpText$: Observable<boolean>;

  constructor() { }

  ngOnInit(): void {}

}
