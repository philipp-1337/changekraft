import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { AuthService } from 'src/app/services/auth.service';
import { DialogUserDeleteComponent } from './dialog-user-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogEmailUpdateComponent } from './dialog-email-update.component';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  providers: [SnackbarClass],
  animations: [
    trigger('rotate', [
      transition('state1 => state2', [
        style({ transform: 'rotate(-540deg)' }),
        animate('.8s ease-in-out', style({ transform: 'rotate(0)' }))
      ])
    ])
  ],
})
export class UserProfilComponent implements OnInit, OnDestroy {
  animate = 'state1';
  private userCollection: AngularFirestoreCollection;

  constructor(
    public userService: UserService,
    private snackbar: SnackbarClass,
    private authservice: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit() {
    this.userService.getUserInfo();
    setTimeout(() => {
      if (!this.userService.verfied) {
        this.snackbar.verificationSnackBar('Bitte E-Mail bestätigen.', 'Link erneut senden?');
      } if (!this.userService.name && this.userService.verfied) {
        this.snackbar.openSnackBar('Bitte einen Namen vergeben.', 'Ok', 0);
      }
    }, 300);
  }

  ngOnDestroy() {
    this.snackbar.closeSnackBar();
  }

  onLogout() {
    this.authservice.logout();
  }

  updateUser(form: NgForm) {
    this.animate = 'state2';
    this.userService.updateUser(form);
    setTimeout(() => {
      this.animate = 'state1';
    }, 1000);
    this.snackbar.closeSnackBar();
  }
  
  async updateEmailDialog() {
    const id = (await this.authservice.getCurrentUser()).uid;
    const name = this.userService.name;
    const user = this.authservice.getCurrentUser();
    const dialogRef = this.dialog.open(DialogEmailUpdateComponent, {
      width: '350px',
      data: { id: id, name: name, user: user }
    });

    dialogRef.afterClosed().subscribe(cred => {
      if (cred === undefined) {
        console.log('E-Mail-Änderung wurde abgegebrochen.');
      } else {
        const newemail = cred.value.newemail;
        const email = cred.value.email;
        const password = cred.value.password;
        console.log('E-Mail-Änderung wurde bestätigt.');
        this.updateEmail(newemail, email, password);
      }
    });
  }

  async deleteDialog() {
    const id = (await this.authservice.getCurrentUser()).uid;
    const name = this.userService.name;
    const user = this.authservice.getCurrentUser();
    const dialogRef = this.dialog.open(DialogUserDeleteComponent, {
      width: '350px',
      data: { id: id, name: name, user: user }
    });

    dialogRef.afterClosed().subscribe(cred => {
      if (cred === undefined) {
        console.log('Löschen wurde abgegebrochen.');
      } else {
        const email = cred.value.email;
        const password = cred.value.password;
        console.log('Lösch-Dialog wurde bestätigt.');
        this.deleteUser(email, password);
      }
    });
  }

  errorSnackbar(errorcode: string) {
    this.snackbar.openSnackBar('Fehler: ' + errorcode, 'Ok', 2500);
  }

  async updateEmail(newemail: string, email: string, password: string) {
    const user = this.authservice.getCurrentUser();
    const credential = this.authservice.getCredential(email, password);
    (await user).reauthenticateWithCredential(credential).then(async response => {
      // User re-authenticated.
      this.userService.updateEmail(newemail);
      console.log('E-Mail Adresse geändert. Alt: ' + email + ' - Neu: ' + newemail);
      this.snackbar.verificationSnackBar('Bitte E-Mail bestätigen.', 'Link erneut senden?');
    }).catch(error => {
      // An error happened.
      console.log(error);
      this.errorSnackbar(error.code);
    });
  }

  async deleteUser(email: string, password: string) {
    const user = this.authservice.getCurrentUser();
    const credential = this.authservice.getCredential(email, password);
    (await user).reauthenticateWithCredential(credential).then(async response => {
      // User re-authenticated.
      (await user).delete().then(promise => {
        // User deleted.
        console.log('Benutzer gelöscht');
        console.log('Der Benutzer mit der E-Mail ' + email + ' wurde gelöscht.');
        this.authservice.logout();
      }).catch(error => {
        // An error happened.
        console.log(error);
        this.errorSnackbar(error.code);
      });
    }).catch(error => {
      // An error happened.
      console.log(error);
      this.errorSnackbar(error.code);
    });
  }
}
