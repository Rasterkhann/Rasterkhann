import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges } from '@angular/core';

import { IGameTown, Building } from '../../interfaces';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-current-map',
  templateUrl: './current-map.component.html',
  styleUrls: ['./current-map.component.scss'],
})
export class CurrentMapComponent implements AfterViewInit, OnChanges {

  @ViewChild('container') container: ElementRef;

  @Input() public town: IGameTown;

  public get availableBuildings(): Building[] {
    return Object.keys(this.town.buildings || {}) as Building[];
  }

  private renderer: any;
  private tileMap: any;

  private spriteMap = {};
  private textMap = {};

  constructor(public game: GameService) { }

  ngAfterViewInit() {
    (window as any).PIXI.utils.skipHello();
    this.renderer = (window as any).PIXI.autoDetectRenderer(480, 480);
    this.container.nativeElement.appendChild(this.renderer.view);

    this.renderer.view.style.width = '100%';
    this.renderer.view.style.height = '100%';

    this.renderer.resolution = 1;

    (window as any).PIXI.loader
      .add('assets/game/town/Rasterkhann.tmx')
      .load(() => {
        this.tileMap = new (window as any).PIXI.extras.TiledMap('assets/game/town/Rasterkhann.tmx');

        const textStyle = new (window as any).PIXI.TextStyle({
          fontFamily: 'VT323',
          fontSize: 12,
          stroke: '#fff'
        });

        this.tileMap.children[4].children.forEach(obj => {
          obj.setInteractive(true);
          obj.setOnCallback('pointerdown', () => {
            this.game.changeInfo(obj.name);
          });

          const isVisible = !!this.town.buildings[obj.name];
          if (!obj.name || !isVisible) { obj.visible = false; }

          if (obj.name) {

            if (!this.spriteMap[obj.name]) { this.spriteMap[obj.name] = []; }
            this.spriteMap[obj.name].push(obj);

            if (obj.properties && obj.properties.aboveText) {
              this.textMap[obj.name] = new (window as any).PIXI.Text(obj.properties.aboveText, textStyle);
              this.textMap[obj.name].x = obj.x + 8;
              this.textMap[obj.name].y = obj.y - 16;
              this.textMap[obj.name].anchor.set(0.5, 0);
              this.textMap[obj.name].visible = isVisible;

              this.tileMap.addChild(this.textMap[obj.name]);
            }
          }
        });

        this.render();
      });
  }

  ngOnChanges(changes) {
    if (changes.town) {
      const currentBuildings = Object.fromEntries(Object.keys(changes.town.currentValue.buildings).map(x => {
        if (!changes.town.currentValue.buildings[x] || !changes.town.currentValue.buildings[x].level) { return []; }
        return [x, true];
      }));

      Object.keys(this.spriteMap).forEach(buildingName => {
        this.toggleVisible(buildingName, false);
        if (!currentBuildings[buildingName]) { return; }

        this.toggleVisible(buildingName, true);
      });
    }
  }

  private toggleVisible(buildingName: string, visible: boolean) {
    const allObjs = this.spriteMap[buildingName];
    (allObjs || []).forEach(obj => obj.setVisibility(visible));
    if (this.textMap[buildingName]) {
      this.textMap[buildingName].visible = visible;
    }

    this.render();
  }

  private render() {
    this.renderer.render(this.tileMap);
  }

}
