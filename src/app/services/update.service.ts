import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { SnackbarClass } from 'src/app/shared/snackbar.class';


@Injectable()
export class UpdateService {
  constructor(public swUpdate: SwUpdate, private snackbar: SnackbarClass) {

    if (swUpdate.isEnabled) {
      interval(6 * 60 * 60).subscribe(() => swUpdate.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }
  }

  public checkForUpdates(): void {
    this.swUpdate.versionUpdates.subscribe(event => this.promptUser());
  }

  private promptUser() {
    this.swUpdate.activateUpdate().then(() => this.snackbar.reloadSnackBar('Es ist ein Update verfügbar.', 'Aktualisieren')); 
  }
}

