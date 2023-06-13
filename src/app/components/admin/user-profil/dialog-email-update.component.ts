import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './dialog-email-update.component.html'
})
export class DialogEmailUpdateComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogEmailUpdateComponent>
  ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
