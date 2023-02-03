import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { DialogShare } from './dialog-share.interface';

@Component({
  selector: 'app-dialog-share',
  templateUrl: './dialog-share.component.html',
  styleUrls: ['./dialog-share.component.scss']
})
export class DialogShareComponent {
  buttonClicked = false;
  constructor(
    public dialogRef: MatDialogRef<DialogShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogShare) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  copyMessage(val: string) {
    this.buttonClicked = true;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    setInterval(() => {
      this.buttonClicked = false;
      this.onCloseClick();
    }, 400);
  }
}
