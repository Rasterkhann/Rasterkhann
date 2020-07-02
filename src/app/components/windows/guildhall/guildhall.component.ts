import { Component, OnInit, Input } from '@angular/core';
import { IGameTown } from '../../../interfaces';
import { HeroService } from '../../../hero.service';

@Component({
  selector: 'app-guildhall',
  templateUrl: './guildhall.component.html',
  styleUrls: ['./guildhall.component.scss'],
})
export class GuildHallComponent implements OnInit {

  @Input() town: IGameTown;

  constructor(public hero: HeroService) { }

  ngOnInit(): void {
    console.log(this.hero.generateProspectiveHero(this.town));
  }

}
