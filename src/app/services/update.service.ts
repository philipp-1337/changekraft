import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SnackbarClass } from 'src/app/shared/snackbar.class';

@Injectable()
export class UpdateService {
  constructor(swUpdate: SwUpdate, private snackbar: SnackbarClass) {
    swUpdate.available.subscribe(event => {
      this.snackbar.reloadSnackBar('Es ist ein Update verfügbar.', 'Aktualisieren');
    });
    swUpdate.activated.subscribe(event => {
      this.snackbar.openSnackBar('Die App wurde aktualisiert.', 'Ok', 2500);
    });
  }
}
