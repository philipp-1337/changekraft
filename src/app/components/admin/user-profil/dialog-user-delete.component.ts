import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './dialog-user-delete.component.html'
})
export class DialogUserDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogUserDeleteComponent>
  ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
