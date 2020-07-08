import { Component, OnInit, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { IGameTown, NewsItem } from '../../../interfaces';
import { GameState } from '../../../states';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss'],
})
export class ArchivesComponent implements OnInit {

  @Input() town: IGameTown;

  @Select(GameState.currentTownNotifications) notifications$: Observable<NewsItem[]>;

  constructor() { }

  ngOnInit(): void {}

}
