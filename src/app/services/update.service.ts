import { Injectable } from '@angular/core';

import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class UpdateService {
  constructor(private swUpdate: SwUpdate, private snackbar: SnackbarClass) {
    this.swUpdate.available.subscribe(evt => {
      const snack = this.snackbar.reloadSnackBar('Update Available', 'Reload');
    })
  }
}