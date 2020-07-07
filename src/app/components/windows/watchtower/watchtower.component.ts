import { Component, OnInit, Input } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { Select } from '@ngxs/store';

import { compressToUTF16, decompressFromUTF16 } from 'async-lz-string';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { IGameTown, IGameState, GameOption } from '../../../interfaces';
import { GameState } from '../../../states';
import { GameService } from '../../../services/game.service';
import { afterDeserialize, beforeSerialize, createDefaultSavefile } from '../../../helpers';


@Component({
  selector: 'app-watchtower',
  templateUrl: './watchtower.component.html',
  styleUrls: ['./watchtower.component.scss'],
})
export class WatchtowerComponent implements OnInit {

  @Input() town: IGameTown;

  @Select(GameState.entireSavefile) gameState$: Observable<IGameState>;
  @Select((state: any) => state.gamestate.options[GameOption.ToggleUpgradeVisiblity]) upgradeVisibility$: Observable<boolean>;

  public get version(): string {
    return `${environment.version.version}-${environment.version.branch}-${environment.version.revision}-${environment.full ? 'FULL RELEASE' : 'DEMO RELEASE'}`;
  }

  constructor(private alert: AlertController, public game: GameService) { }

  ngOnInit(): void {}

  import($event: any): void {
    const file: File = $event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onloadend = async () => {
      try {
        const saveData = reader.result;
        $event.target.value = null;

        const alert = await this.alert.create({
          header: 'Load Save Data',
          message: 'Are you sure you want to overwrite your current save with the loaded save file?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary'
            }, {
              text: 'Yes, Load',
              handler: async () => {
                const loadedData = await decompressFromUTF16(saveData as string);
                const jsonData = JSON.parse(loadedData);
                this.game.loadState(afterDeserialize(jsonData));
              }
            }
          ]
        });

        await alert.present();

      } catch (e) {
        alert(`Could not load save data: ${e}`);
      }
    };

    reader.readAsText(file);
  }

  export(): void {
    this.gameState$
      .pipe(first())
      .subscribe(async savefile => {
        const jsonString = JSON.stringify(beforeSerialize(savefile), null, 4);
        const lzString = await compressToUTF16(jsonString);
        const blob = new Blob([lzString], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, `rasterkhann-${Date.now()}.sav`);
      });
  }

  async delete(): Promise<void> {
    const alert = await this.alert.create({
      header: 'Delete Save Data',
      message: 'Are you sure you want to reset your current game? This is irreversible and instantaneous and you will not be able to get your data back.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes, Reset The Game',
          handler: () => {
            const saveData = createDefaultSavefile();
            this.game.loadState(saveData);
          }
        }
      ]
    });

    await alert.present();
  }

}
