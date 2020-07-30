import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NgxsModule, getActionTypeFromInstance } from '@ngxs/store';
import { NgxsStoragePluginModule, StorageEngine, STORAGE_ENGINE } from '@ngxs/storage-plugin';
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
import { GameLoop, GainGold, HeroGainGold, HeroGainEXP, HeroSetLocation, HeroSetDestination, ChooseInfo } from './actions';

export class FilesystemStorageEngine implements StorageEngine {

  private storage: Record<string, any> = {};

  constructor() {
    this.load();
  }

  get length(): number {
    return Object.keys(this.storage).length;
  }

  getItem(key: string): any {
    return this.storage[key];
  }

  setItem(key: string, val: any): void {
    this.storage[key] = val;
    this.persist();
  }

  removeItem(key: string): void {
    delete this.storage[key];
    this.persist();
  }

  clear(): void {
    this.storage = {};
    this.persist();
  }

  private load(): void {
    if (!(window as any).isDownloaded) { return; }
    const saveFile = (window as any).loadCurrentSavefile();
    this.storage = saveFile;
  }

  private persist(): void {
    if (!(window as any).isDownloaded) { return; }
    (window as any).saveCurrentSavefile(this.storage);
  }
}

const imports = [
  BrowserModule,
  HttpClientModule,
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
      const ignoreActions: any = {
        [GameLoop.type]: true, [GainGold.type]: true,
        [HeroGainEXP.type]: true, [HeroGainGold.type]: true,
        [HeroSetLocation.type]: true, [HeroSetDestination.type]: true,
        [ChooseInfo.type]: true
      };
      const actionType: string = getActionTypeFromInstance(action) as string;
      return !ignoreActions[actionType];
    }
  })
];

const providers: any = [
  StatusBar,
  SplashScreen,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  DecimalPipe
];

if ((window as any).isDownloaded) {
  console.log('Running with native filesystem-backed saves...');
  providers.push({
    provide: STORAGE_ENGINE,
    useClass: FilesystemStorageEngine
  });
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports,
  providers,
  bootstrap: [AppComponent]
})
export class AppModule {}
