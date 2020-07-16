import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() {
    this.init();
  }

  private init(): void {
    window.addEventListener('error', (ev) => {
      this.errorLog(ev.message);
    });
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
