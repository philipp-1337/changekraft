import { Component } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

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
