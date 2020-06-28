import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { CurrentMapComponent } from '../components/current-map/current-map.component';
import { CurrentTownComponent } from '../components/current-town/current-town.component';
import { CurrentInfoComponent } from '../components/current-info/current-info.component';

import { AlchemistComponent } from '../components/windows/alchemist/alchemist.component';
import { ArmoryComponent } from '../components/windows/armory/armory.component';
import { BazaarComponent } from '../components/windows/bazaar/bazaar.component';
import { CaveComponent } from '../components/windows/cave/cave.component';
import { GuildHallComponent } from '../components/windows/guildhall/guildhall.component';
import { HouseComponent } from '../components/windows/house/house.component';
import { InnComponent } from '../components/windows/inn/inn.component';
import { TownHallComponent } from '../components/windows/townhall/townhall.component';
import { WatchtowerComponent } from '../components/windows/watchtower/watchtower.component';
import { WorkshopComponent } from '../components/windows/workshop/workshop.component';
import { BignumPipe } from '../bignum.pipe';


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
    CurrentInfoComponent,

    AlchemistComponent,
    ArmoryComponent,
    BazaarComponent,
    CaveComponent,
    GuildHallComponent,
    HouseComponent,
    InnComponent,
    TownHallComponent,
    WatchtowerComponent,
    WorkshopComponent,

    BignumPipe
  ]
})
export class HomePageModule {}
