import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog-data.interface';

@Component({
  selector: 'app-dialog-share',
  templateUrl: './dialog-share.component.html'
})
export class DialogShareComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
