import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { ProspectiveHero } from '../../../interfaces';

@Component({
  selector: 'app-prospective-hero',
  templateUrl: './prospective-hero.component.html',
  styleUrls: ['./prospective-hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProspectiveHeroComponent implements OnInit {

  @Input() prospectiveHero: ProspectiveHero;

  constructor() { }

  ngOnInit(): void {}

}
