import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CountdownModule } from 'ngx-countdown';

import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { CurrentMapComponent } from '../current-map/current-map.component';
import { CurrentTownComponent } from '../current-town/current-town.component';
import { CurrentInfoComponent } from '../current-info/current-info.component';
import { CurrentNotificationComponent } from '../current-notification/current-notification.component';

import { AlchemistComponent } from '../windows/alchemist/alchemist.component';
import { ArchivesComponent } from '../windows/archives/archives.component';
import { ArmoryComponent } from '../windows/armory/armory.component';
import { BazaarComponent } from '../windows/bazaar/bazaar.component';
import { CaveComponent } from '../windows/cave/cave.component';
import { GuildHallComponent } from '../windows/guildhall/guildhall.component';
import { HouseComponent } from '../windows/house/house.component';
import { InnComponent } from '../windows/inn/inn.component';
import { LibraryComponent } from '../windows/library/library.component';
import { TownHallComponent } from '../windows/townhall/townhall.component';
import { WatchtowerComponent } from '../windows/watchtower/watchtower.component';
import { WorkshopComponent } from '../windows/workshop/workshop.component';

import { BignumPipe } from '../../bignum.pipe';
import { BuildingInfoComponent } from '../shared/building-info/building-info.component';
import { FeatureListComponent } from '../shared/feature-list/feature-list.component';

import { GuildModalComponent } from '../windows/guildhall/guild-modal/guild-modal.component';
import { AdventureModalComponent } from '../windows/cave/adventure-modal/adventure-modal.component';
import { ItemsModalComponent } from '../windows/bazaar/items-modal/items-modal.component';
import { CombatLogModalComponent } from '../windows/cave/combat-log-modal/combat-log-modal.component';

import { HeroComponent } from '../shared/hero/hero.component';
import { HeroSpriteComponent } from '../shared/hero-sprite/hero-sprite.component';
import { AdventureComponent } from '../shared/adventure/adventure.component';
import { ItemComponent } from '../shared/item/item.component';
import { HelpTextComponent } from '../shared/help-text/help-text.component';


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
    ItemComponent,
    HelpTextComponent,

    GuildModalComponent,
    AdventureModalComponent,
    ItemsModalComponent,
    CombatLogModalComponent,

    BignumPipe
  ],
  entryComponents: [
    GuildModalComponent,
    AdventureModalComponent,
    ItemsModalComponent,
    CombatLogModalComponent
  ]
})
export class HomePageModule {}
