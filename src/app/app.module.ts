import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NgxsModule, getActionTypeFromInstance } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { migrations } from './migrations';
import { GameState } from './states';
import { beforeSerialize, afterDeserialize } from './helpers';
import { GameLoop, GainGold } from './actions';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxsModule.forRoot([GameState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: 'gamestate',
      beforeSerialize,
      afterDeserialize,
      migrations
    }),
    NgxsLoggerPluginModule.forRoot({
      collapsed: true,
      disabled: environment.production,
      filter: action => {
        const ignoreActions: any = { [GameLoop.type]: true, [GainGold.type]: true };
        const actionType: string = getActionTypeFromInstance(action) as string;
        return !ignoreActions[actionType];
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
