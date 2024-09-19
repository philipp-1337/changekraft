import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs/operators';
import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UpdateService {
  constructor(public swUpdate: SwUpdate, private snackbar: SnackbarClass, private matSnackBar: MatSnackBar) {
    swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(evt => {
        this.promptUser();
        console.log('UPDATE_AVAILABLE');
      });
  }

  // Use both SnackbarClass and MatSnackBar
  private promptUser() {
    this.swUpdate.activateUpdate().then(() => {
      this.snackbar.reloadSnackBar('Es ist ein Update verfügbar.', 'Aktualisieren');
      this.reloadSnackBar('Es ist ein Update verfügbar.', 'Aktualisieren');
    });
  }

  // MatSnackBar reload prompt
  public reloadSnackBar(message: string, action: string) {
    const snackBarRef = this.matSnackBar.open(message, action);
    snackBarRef.onAction().subscribe(() => {
      window.location.reload();
    });
  }

  updatesAvailable = this.swUpdate.versionUpdates.pipe(
    filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
    map(evt => ({
      type: 'UPDATE_AVAILABLE',
      current: evt.currentVersion,
      available: evt.latestVersion,
    }))
  );
}