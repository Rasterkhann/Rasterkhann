import { Injectable } from '@angular/core';
import { debounce } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() {
    this.init();
  }

  private init(): void {
    window.addEventListener('error', debounce((ev) => {
      this.errorLog(ev.message);
    }, 500));
  }

  log(message: string): void {
    if ((window as any).isDownloaded) {
      (window as any).log(message);
    }

    console.log(message);
  }

  errorLog(message: string): void {
    if ((window as any).isDownloaded) {
      (window as any).errorLog(message);
    }

    console.error(message);
  }
}
