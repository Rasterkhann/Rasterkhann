import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero-sprite',
  templateUrl: './hero-sprite.component.html',
  styleUrls: ['./hero-sprite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSpriteComponent {

  @Input() sprite: string;

}
