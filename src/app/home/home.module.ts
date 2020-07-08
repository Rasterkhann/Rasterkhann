import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CountdownModule } from 'ngx-countdown';

import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { CurrentMapComponent } from '../components/current-map/current-map.component';
import { CurrentTownComponent } from '../components/current-town/current-town.component';
import { CurrentInfoComponent } from '../components/current-info/current-info.component';
import { CurrentNotificationComponent } from '../components/current-notification/current-notification.component';

import { AlchemistComponent } from '../components/windows/alchemist/alchemist.component';
import { ArchivesComponent } from '../components/windows/archives/archives.component';
import { ArmoryComponent } from '../components/windows/armory/armory.component';
import { BazaarComponent } from '../components/windows/bazaar/bazaar.component';
import { CaveComponent } from '../components/windows/cave/cave.component';
import { GuildHallComponent } from '../components/windows/guildhall/guildhall.component';
import { HouseComponent } from '../components/windows/house/house.component';
import { InnComponent } from '../components/windows/inn/inn.component';
import { LibraryComponent } from '../components/windows/library/library.component';
import { TownHallComponent } from '../components/windows/townhall/townhall.component';
import { WatchtowerComponent } from '../components/windows/watchtower/watchtower.component';
import { WorkshopComponent } from '../components/windows/workshop/workshop.component';

import { BignumPipe } from '../bignum.pipe';
import { BuildingInfoComponent } from '../components/shared/building-info/building-info.component';
import { FeatureListComponent } from '../components/shared/feature-list/feature-list.component';
import { GuildModalComponent } from '../components/windows/guildhall/guild-modal/guild-modal.component';
import { AdventureModalComponent } from '../components/windows/cave/adventure-modal/adventure-modal.component';
import { HeroComponent } from '../components/shared/hero/hero.component';
import { HeroSpriteComponent } from '../components/shared/hero-sprite/hero-sprite.component';
import { AdventureComponent } from '../components/shared/adventure/adventure.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,

    CountdownModule
  ],
  declarations: [
    HomePage,
    CurrentMapComponent,
    CurrentTownComponent,
    CurrentInfoComponent,
    CurrentNotificationComponent,

    AlchemistComponent,
    ArchivesComponent,
    ArmoryComponent,
    BazaarComponent,
    CaveComponent,
    GuildHallComponent,
    HouseComponent,
    InnComponent,
    LibraryComponent,
    TownHallComponent,
    WatchtowerComponent,
    WorkshopComponent,

    BuildingInfoComponent,
    FeatureListComponent,
    HeroComponent,
    HeroSpriteComponent,
    AdventureComponent,

    GuildModalComponent,
    AdventureModalComponent,

    BignumPipe
  ],
  entryComponents: [
    GuildModalComponent,
    AdventureModalComponent
  ]
})
export class HomePageModule {}
