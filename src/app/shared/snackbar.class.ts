import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarClass {
  constructor(public snackBar: MatSnackBar) {}
  public openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration
    });
  }

  public reloadSnackBar(message: string, action: string, duration: number) {
    let snackBarRef = this.snackBar.open(message, action);
    snackBarRef.onAction().subscribe(() => {
      window.location.reload();
    });
  }
}
