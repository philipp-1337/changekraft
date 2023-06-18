import { Component, Inject } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogShare } from './dialog-share.interface';

@Component({
  selector: 'app-dialog-share',
  templateUrl: './dialog-share.component.html',
  styleUrls: ['./dialog-share.component.scss']
})
export class DialogShareComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogShareComponent>,
    private clipboard: Clipboard,
    @Inject(MAT_DIALOG_DATA) public data: DialogShare) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  copyMessage(url: string){
    this.clipboard.copy(url);
    setInterval(() => {
      this.onCloseClick();
    }, 400);
  }
}
