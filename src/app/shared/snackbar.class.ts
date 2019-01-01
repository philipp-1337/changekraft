import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarClass {
  constructor(public snackBar: MatSnackBar) {}
  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500
    });
  }
}
