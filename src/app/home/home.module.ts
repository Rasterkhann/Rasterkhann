import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CurrentMapComponent } from '../components/current-map/current-map.component';
import { CurrentTownComponent } from '../components/current-town/current-town.component';
import { CurrentInfoComponent } from '../components/current-info/current-info.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    CurrentMapComponent,
    CurrentTownComponent,
    CurrentInfoComponent
  ]
})
export class HomePageModule {}
