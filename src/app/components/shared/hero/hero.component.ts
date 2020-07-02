import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Hero } from '../../../interfaces';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit {

  @Input() hero: Hero;

  constructor() { }

  ngOnInit(): void {}

}
