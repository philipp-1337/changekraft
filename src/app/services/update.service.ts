import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class UpdateService {
  constructor(public swUpdate: SwUpdate, private snackbar: SnackbarClass) {
    swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(evt => {
        this.promptUser();
      });
  }

  private promptUser() {
    this.swUpdate.activateUpdate().then(() => this.snackbar.reloadSnackBar('Es ist ein Update verfügbar.', 'Aktualisieren')); 
  }

  updatesAvailable = this.swUpdate.versionUpdates.pipe(
    filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
    map(evt => ({
      type: 'UPDATE_AVAILABLE',
      current: evt.currentVersion,
      available: evt.latestVersion,
    })));

}

