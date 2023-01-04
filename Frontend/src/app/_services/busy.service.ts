import { Injectable } from '@angular/core';
import {  NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  bustRequestCount = 0;
  
  constructor(private spinnerService : NgxSpinnerService) {}

  busy() {
    this.bustRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'square-loader',
      bdColor: 'rgba(255,255,255,.3)',
      color: '#009c96',
    });
  }

  idle() {
    this.bustRequestCount--;
    if ((this, this.bustRequestCount <= 0)) {
      this.bustRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
