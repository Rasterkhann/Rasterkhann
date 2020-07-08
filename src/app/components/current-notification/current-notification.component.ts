import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

import { Observable, Subject, timer, interval } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

import { GameState } from '../../states';
import { NewsItem } from '../../interfaces';

@Component({
  selector: 'app-current-notification',
  templateUrl: './current-notification.component.html',
  styleUrls: ['./current-notification.component.scss'],
})
export class CurrentNotificationComponent implements OnInit {

  @Select(GameState.currentTownNotifications) notifications$: Observable<NewsItem[]>;

  private notificationQueue: NewsItem[] = [];
  public currentNotification$ = interval(3000).pipe(
    map(() => this.notificationQueue[0]),
    tap(() => this.notificationQueue.pop())
  );

  constructor() { }

  ngOnInit(): void {
    let hasFirstRun = true;
    this.notifications$.subscribe(val => {
      if (hasFirstRun) {
        hasFirstRun = false;
        return;
      }

      this.notificationQueue.unshift(val[val.length - 1]);
    });
  }

}
