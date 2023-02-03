import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SnackbarClass } from 'src/app/shared/snackbar.class';


@Injectable()
export class UpdateService {
  constructor(swUpdate: SwUpdate, private snackbar: SnackbarClass) {
    swUpdate.versionUpdates.subscribe(event => {
      this.snackbar.reloadSnackBar('Es ist ein Update verfügbar.', 'Aktualisieren');
    });
    // SwUpdate has changed. Check !!!
    // swUpdate.activateUpdate.??call??(event => { 
    //   this.snackbar.openSnackBar('Die App wurde aktualisiert.', 'Ok', 2500);
    // });
  }
}
