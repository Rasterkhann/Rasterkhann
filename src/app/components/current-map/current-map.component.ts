import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import * as Pathfinding from 'pathfinding';

import { visibleBuildingFeatures } from '../../helpers';

import { GameTown, Building, Hero } from '../../interfaces';
import { GameService } from '../../services';
import { GameState } from '../../states';
import { sample } from 'lodash';
import { HeroSetDestination, HeroSetLocation } from '../../actions';

const PIXI = (window as any).PIXI;

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

@Component({
  selector: 'app-current-map',
  templateUrl: './current-map.component.html',
  styleUrls: ['./current-map.component.scss'],
})
export class CurrentMapComponent implements AfterViewInit, OnChanges {

  @ViewChild('container') container: ElementRef;

  @Select(GameState.currentInfoWindow) currentInfo$: Observable<{ window: string, autoOpen: boolean }>;
  @Select(GameState.currentTownRecruitedHeroes) recruitedHeroes$: Observable<Hero[]>;

  @Input() public town: GameTown;

  public get availableBuildings(): Building[] {
    return Object.keys(this.town.buildings || {}) as Building[];
  }

  private app: any;
  private tileMap: any;
  private navGrid: Pathfinding.Grid;

  private buildingXY: Partial<Record<Building, { x: number, y: number }>> = {};

  private spriteMap: Record<string, any> = {};
  private textMap: Record<string, any> = {};
  private featureMap: Record<string, any> = {};
  private secondaryFeatureMap: Record<string, any> = {};
  private heroMap: Record<string, any> = {};
  private heroPathMap: Record<string, Array<[number, number]>> = {};

  private currentSprite: any;

  private spriteSub: Subscription;

  private maps = [
    'assets/game/town/CentralRasterkhann.tmx'
  ];

  private sprites = [
    Array(4).fill(0).map((x, i) => `adventurer_f${i + 1}.png`),
    Array(4).fill(0).map((x, i) => `adventurer_m${i + 1}.png`),
    [
      'cleric', 'fighter', 'guard', 'hunter', 'knight', 'mage', 'ninja',
      'oldman', 'rogue', 'templar', 'thief', 'warrior', 'wizard'
    ].map(job => Array(4).fill(0).map((x, i) => `${job}${i + 1}.png`))
  ].flat(2);

  constructor(private state: GameState, private store: Store, public game: GameService) { }

  ngAfterViewInit(): void {
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    }, false);

    this.initRenderer();
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

        if (buildingName === Building.GuildHall) {
          this.secondaryFeatureMap[buildingName].visible = this.town.recruitedHeroes.some(h => this.game.canRetireHero(this.town, h));
        }
      });
    }
  }

  private getFramesFromSpriteSheet(texture: any, frameWidth: number, frameHeight: number): any[] {
    const frames = [];
    for (let i = 0; i < texture.width; i += frameWidth) {
      frames.push(new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(i, 0, frameWidth, frameHeight)));
    }
    return frames;
  }

  private initRenderer(): void {
    PIXI.settings.PRECISION_FRAGMENT = 'highp';
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    PIXI.utils.skipHello();

    this.app = new PIXI.Application({
      width: 480,
      height: 480,
      resolution: window.devicePixelRatio || 1,
      transparent: true,
      antialias: false
    });

    this.container.nativeElement.appendChild(this.app.view);

    this.app.view.style.width = '100%';
    this.app.view.style.height = '100%';

    this.maps.forEach(map => PIXI.loader.add(map));
    this.sprites.forEach(sprite => PIXI.loader.add(sprite.split('.')[0], `assets/game/hero/${sprite}`));

    PIXI.loader
      .load((loader: any, resources: any) => {
        this.setMap('CentralRasterkhann', resources);
      });
  }

  private setMap(mapName: string, resources: any): void {
    this.tileMap = new PIXI.extras.TiledMap(`assets/game/town/${mapName}.tmx`);

    // hide the nav layer; no one needs to see that uggo
    this.tileMap.children[4].visible = false;

    this.tileMap.children[5].children.forEach((obj: any) => {

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

        if (obj.properties && obj.properties.entrance) {
          this.buildingXY[obj.name as Building] = { x: obj.x / this.tileMap.tileWidth, y: obj.y / this.tileMap.tileHeight };
        }

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

          // add "important" abovedot
          this.secondaryFeatureMap[obj.name] = PIXI.Sprite.from('assets/game/ui/heyorb.png');
          this.secondaryFeatureMap[obj.name].x = obj.x + 24;
          this.secondaryFeatureMap[obj.name].y = obj.y - 24;
          this.secondaryFeatureMap[obj.name].visible = false;
          this.secondaryFeatureMap[obj.name].anchor.set(0.5);
          this.secondaryFeatureMap[obj.name].roundPixels = false;

          this.tileMap.addChild(this.secondaryFeatureMap[obj.name]);
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
    this.watchAndMoveHeroes(resources);

    this.generateNavMap();
  }

  private toggleVisible(buildingName: string, visible: boolean): void {
    const allObjs = this.spriteMap[buildingName];
    (allObjs || []).forEach((obj: any) => obj.setVisibility(visible));
    if (this.textMap[buildingName]) {
      this.textMap[buildingName].visible = visible;
    }
  }

  private addAnimations(): void {

    const MOVE_SPEED_DELTA_MULT = 0.2;

    // rotate all of the "currently has upgrade" icons
    /*
    this.app.ticker.add((delta: number) => {
      Object.values(this.featureMap).forEach(sprite => {
        sprite.rotation -= 0.05 * delta;
      });

      Object.values(this.secondaryFeatureMap).forEach(sprite => {
        sprite.rotation -= 0.05 * delta;
      });
    });
    */

    // move the arrow up and down slightly
    this.app.ticker.add((delta: number) => {
      this.currentSprite.y -= 0.02 * delta;
    });

    // move all heroes with a path
    this.app.ticker.add((delta: number) => {
      Object.keys(this.heroPathMap).forEach(heroId => {
        const heroRef = this.town.recruitedHeroes.find(h => h.uuid === heroId);
        if (!heroRef) { return; }

        this.setVisible(heroId, true);

        const heroSprite = this.heroMap[heroId];

        const path = this.heroPathMap[heroId];
        const next = path[0];

        if (!path) {
          this.setVisible(heroId, false);
          return;
        }

        if (next[0] && Math.floor(heroSprite.x) !== next[0]) {
          if (heroSprite.x < next[0]) {
            heroSprite.x += delta * MOVE_SPEED_DELTA_MULT;
          } else {
            heroSprite.x -= delta * MOVE_SPEED_DELTA_MULT;
          }
        }

        if (next[1] && Math.floor(heroSprite.y) !== next[1]) {
          if (heroSprite.y < next[1]) {
            heroSprite.y += delta * MOVE_SPEED_DELTA_MULT;
          } else {
            heroSprite.y -= delta * MOVE_SPEED_DELTA_MULT;
          }
        }

        if ((next[0] && Math.floor(heroSprite.x) === next[0])
        &&  (next[1] && Math.floor(heroSprite.y) === next[1])) {
          this.heroPathMap[heroId].shift();
        }

        if (path.length === 0) {
          this.setVisible(heroId, false);
          this.store.dispatch(new HeroSetLocation(heroId, heroRef.goingToBuilding));
        }
      });
    });
  }

  private watchAndMoveHeroes(resources: any): void {
    this.recruitedHeroes$.subscribe(heroes => {
      heroes.forEach((hero, i) => {
        if (this.heroMap[hero.uuid]) { return; }

        this.heroMap[hero.uuid] = new PIXI.extras.AnimatedSprite(
          this.getFramesFromSpriteSheet(resources[hero.sprite].texture, 16, 16)
        );

        const building = hero.currentlyAtBuilding || Building.Inn;
        const { x, y } = this.buildingXY[building] as { x: number, y: number };
        this.heroMap[hero.uuid].x = x;
        this.heroMap[hero.uuid].y = y;
        this.heroMap[hero.uuid].animationSpeed = 0.05;
        this.heroMap[hero.uuid].gotoAndPlay(0);
        this.heroMap[hero.uuid].visible = false;
        this.app.stage.addChild(this.heroMap[hero.uuid]);

        this.heroMap[hero.uuid].visible = false;

        if (!hero.onAdventure) {
          this.store.dispatch(new HeroSetLocation(hero.uuid, building));
        }
      });
    });

    this.state.removeHero$.subscribe(heroId => this.removeHero(heroId));
    // this.state.showHero$.subscribe(heroId => this.setVisible(heroId, true));
    this.state.hideHero$.subscribe(heroId => this.setVisible(heroId, false));
    this.state.walkHero$.subscribe(heroId => this.pickPathForHero(heroId));
  }

  private setVisible(heroId: string, visible: boolean): void {
    if (!this.heroMap[heroId]) { return; }

    this.heroMap[heroId].visible = visible;

    if (!visible) {
      delete this.heroPathMap[heroId];
    }
  }

  private removeHero(heroId: string): void {
    if (!this.heroMap[heroId]) { return; }

    this.app.stage.removeChild(this.heroMap[heroId]);
    delete this.heroMap[heroId];
    delete this.heroPathMap[heroId];
  }

  private generateNavMap(): void {
    const validTiles: Array<{ x: number, y: number }> = this.tileMap.layers[3].tiles
      .map((t: any, idx: number) => ({ idx, x: idx % this.tileMap._width, y: Math.floor(idx / this.tileMap._height) }))
      .flat()
      .filter(({ x, y }: { x: number, y: number }) => x >= 0 && y >= 0 && x < this.tileMap._width && y < this.tileMap._height);

    this.navGrid = new Pathfinding.Grid(this.tileMap._width, this.tileMap._height);

    for (let x = 0; x < this.tileMap._width; x++) {
      for (let y = 0; y < this.tileMap._height; y++) {
        this.navGrid.setWalkableAt(x, y, false);
      }
    }

    validTiles.forEach(({ x, y }) => {
      this.navGrid.setWalkableAt(x, y, true);
    });

    Object.values(this.buildingXY).forEach(coords => {
      if (!coords) { return; }
      const { x, y } = coords;
      this.navGrid.setWalkableAt(x, y, true);
    });
  }

  private pickPathForHero(heroId: string): void {
    const heroRef = this.town.recruitedHeroes.find(h => h.uuid === heroId);
    if (!heroRef || !heroRef.currentlyAtBuilding || heroRef.goingToBuilding) { return; }

    const { x: startX, y: startY } = this.buildingXY[heroRef.currentlyAtBuilding] as { x: number, y: number };
    this.heroMap[heroId].x = startX * this.tileMap.tileWidth;
    this.heroMap[heroId].y = startY * this.tileMap.tileHeight;

    if (heroRef.onAdventure) { return; }

    const buildings = Object.keys(this.town.buildings)
      .filter((b: Building) => this.town.buildings[b].level > 0 && b !== heroRef.currentlyAtBuilding);
    const building = sample(buildings) as Building;

    if (!this.buildingXY[heroRef.currentlyAtBuilding] || !this.buildingXY[building]) { return; }

    const finder = new Pathfinding.AStarFinder({
      allowDiagonal: false
    } as any);

    const { x: endX, y: endY } = this.buildingXY[building] as { x: number, y: number };

    const path = finder.findPath(startX, startY, endX, endY, this.navGrid.clone())
      .map(([x, y]) => ([x * this.tileMap.tileWidth, y * this.tileMap.tileHeight]));

    if (path.length === 0) {
      this.game.logger.errorLog(`Could not draw path from ${heroRef.currentlyAtBuilding} to ${building}.`);
      return;
    }

    // the first node is always where you are
    path.shift();

    this.heroPathMap[heroId] = path as Array<[number, number]>;
    this.store.dispatch(new HeroSetDestination(heroId, building));
  }

}
