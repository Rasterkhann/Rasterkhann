import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-book-sprite',
  templateUrl: './book-sprite.component.html',
  styleUrls: ['./book-sprite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookSpriteComponent {

  @Input() sprite: number;

  public get spriteLocation(): string {
    const divisor = 20;
    const y = Math.floor(this.sprite / divisor);
    const x = this.sprite % divisor;

    return `-${x * 32}px -${y * 32}px`;
  }

}
