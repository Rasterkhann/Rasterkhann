import { Component, OnDestroy, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-sprite',
  templateUrl: './hero-sprite.component.html',
  styleUrls: ['./hero-sprite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSpriteComponent implements OnDestroy, OnInit {

  @Input() sprite: string;
  @Input() animated = true;

  public get offset(): string {
    return `-${this.frame * 16}px -0px`;
  }

  private frame = 0;
  private timer$: Subscription;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.timer$ = timer(0, 300).subscribe(() => {
      console.log(this.frame, this.offset);
      this.frame++;
      if (this.frame > 3) {
        this.frame = 0;
      }

      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.timer$) { this.timer$.unsubscribe(); }
  }

}
