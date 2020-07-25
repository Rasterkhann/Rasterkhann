import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { visibleBuildingFeatures } from '../../helpers';

import { IGameTown, Building } from '../../interfaces';
import { GameService } from '../../services/game.service';
import { GameState } from '../../states';

const PIXI = (window as any).PIXI;

@Component({
  selector: 'app-current-map',
  templateUrl: './current-map.component.html',
  styleUrls: ['./current-map.component.scss'],
})
export class CurrentMapComponent implements AfterViewInit, OnChanges {

  @ViewChild('container') container: ElementRef;

  @Select(GameState.currentInfoWindow) currentInfo$: Observable<{ window: string, autoOpen: boolean }>;

  @Input() public town: IGameTown;

  public get availableBuildings(): Building[] {
    return Object.keys(this.town.buildings || {}) as Building[];
  }

  private app: any;
  private tileMap: any;

  private spriteMap: Record<string, any> = {};
  private textMap: Record<string, any> = {};
  private featureMap: Record<string, any> = {};

  private currentSprite: any;

  private spriteSub: Subscription;

  private maps = [
    'assets/game/town/Rasterkhann.tmx'
  ];

  private sprites = [
    Array(4).fill(0).map((x, i) => `adventurer_f${i + 1}.png`),
    Array(4).fill(0).map((x, i) => `adventurer_m${i + 1}.png`),
    [
      'cleric', 'fighter', 'guard', 'hunter', 'knight', 'mage', 'ninja',
      'oldman', 'rogue', 'templar', 'thief', 'warrior', 'wizard'
    ].map(job => Array(4).fill(0).map((x, i) => `${job}${i + 1}.png`))
  ].flat(2);

  constructor(public game: GameService) { }

  ngAfterViewInit(): void {
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    }, false);

    this.initRenderer();
  }

  getFramesFromSpriteSheet(texture: any, frameWidth: number, frameHeight: number): any[] {
    const frames = [];
    for (let i = 0; i < texture.width - frameWidth; i += frameWidth) {
        frames.push(new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(i, 0, frameWidth, frameHeight)));
    }
    return frames;
  }

  private initRenderer(): void {
    PIXI.settings.PRECISION_FRAGMENT = 'highp';
    PIXI.utils.skipHello();

    this.app = new PIXI.Application({
      width: 480,
      height: 480,
      resolution: window.devicePixelRatio || 1,
      transparent: true,
      antialias: false
    });

    this.container.nativeElement.appendChild(this.app.view);

    this.app.renderer.view.style.width = '100%';
    this.app.renderer.view.style.height = '100%';

    this.maps.forEach(map => PIXI.loader.add(map));
    this.sprites.forEach(sprite => PIXI.loader.add(sprite.split('.')[0], `assets/game/hero/${sprite}`));

    PIXI.loader
      .load((loader: any, resources: any) => {
        console.log(resources);
        this.tileMap = new PIXI.extras.TiledMap('assets/game/town/Rasterkhann.tmx');

        const textStyle = new PIXI.TextStyle({
          fontFamily: 'VT323',
          fontSize: '12px',
          // fill: '#fff',
          // stroke: '#000',
          // strokeThickness: 3,
          dropShadow: true,
          dropShadowDistance: 0,
          letterSpacing: 0.5
        });

        this.tileMap.children[4].children.forEach((obj: any) => {

          // click building to open info
          obj.setInteractive(true);
          obj.setOnCallback('pointerdown', (event: any) => {
            if (event.data.button === 2) { return; } // swallow right clicks
            this.game.changeInfo(obj.name);
          });
          obj.setOnCallback('rightclick', () => {
            this.game.changeInfo(obj.name, true);
            return false;
          });

          if (!obj.name) { obj.visible = false; }

          if (obj.name) {
            const isVisible = this.town.buildings[obj.name as Building].level > 0;
            if (!isVisible) { obj.visible = false; }

            if (!this.spriteMap[obj.name]) { this.spriteMap[obj.name] = []; }
            this.spriteMap[obj.name].push(obj);

            if (obj.properties && obj.properties.aboveText) {
              // add text
              this.textMap[obj.name] = new PIXI.Text(obj.properties.aboveText, textStyle);
              this.textMap[obj.name].x = obj.x + 8;
              this.textMap[obj.name].y = obj.y - 16;
              this.textMap[obj.name].anchor.set(0.5, 0);
              this.textMap[obj.name].visible = isVisible;
              this.textMap[obj.name].resolution = 1;
              this.textMap[obj.name].roundPixels = true;

              this.tileMap.addChild(this.textMap[obj.name]);

              // click text to open building info
              this.textMap[obj.name].interactive = true;
              this.textMap[obj.name].buttonMode = true;
              this.textMap[obj.name].on('pointerdown', (event: any) => {
                if (event.data.button === 2) { return; } // swallow right clicks
                this.game.changeInfo(obj.name);
              });
              this.textMap[obj.name].on('rightclick', () => {
                this.game.changeInfo(obj.name, true);
              });

              // add abovedot
              this.featureMap[obj.name] = PIXI.Sprite.from('assets/game/ui/orb.png');
              this.featureMap[obj.name].x = obj.x + 8;
              this.featureMap[obj.name].y = obj.y - 24;
              this.featureMap[obj.name].visible = false;
              this.featureMap[obj.name].anchor.set(0.5);
              this.featureMap[obj.name].roundPixels = false;

              this.tileMap.addChild(this.featureMap[obj.name]);
            }
          }
        });

        this.currentSprite = PIXI.Sprite.from('assets/game/ui/arrow.png');
        this.tileMap.addChild(this.currentSprite);

        if (this.spriteSub) { this.spriteSub.unsubscribe(); }
        this.spriteSub = this.currentInfo$.subscribe(({ window }) => {
          const buildingTextPos = this.textMap[window];
          this.currentSprite.x = buildingTextPos.x - 8;
          this.currentSprite.y = buildingTextPos.y - 20;
        });

        this.app.stage.addChild(this.tileMap);

        this.addAnimations();
      });
  }

  ngOnChanges(changes: any): void {
    if (changes.town) {
      const currentBuildings = Object.fromEntries(Object.keys(changes.town.currentValue.buildings).map(x => {
        if (!changes.town.currentValue.buildings[x] || !changes.town.currentValue.buildings[x].level) { return []; }
        return [x, true];
      }));

      Object.keys(this.spriteMap).forEach((buildingName: Building) => {
        this.toggleVisible(buildingName, false);
        if (!currentBuildings[buildingName]) { return; }

        this.toggleVisible(buildingName, true);
        this.featureMap[buildingName].visible = visibleBuildingFeatures(this.town, buildingName).length > 0;
      });
    }
  }

  private toggleVisible(buildingName: string, visible: boolean): void {
    const allObjs = this.spriteMap[buildingName];
    (allObjs || []).forEach((obj: any) => obj.setVisibility(visible));
    if (this.textMap[buildingName]) {
      this.textMap[buildingName].visible = visible;
    }
  }

  private addAnimations(): void {
    this.app.ticker.add((delta: number) => {
      Object.values(this.featureMap).forEach(sprite => {
        sprite.rotation -= 0.05 * delta;
      });

      this.currentSprite.y -= 0.02 * delta;
    });
  }

}
