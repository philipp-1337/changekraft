import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarClass } from 'src/app/shared/snackbar.class';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  providers: [SnackbarClass]
})
export class UserProfilComponent implements OnInit {

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private snackbar: SnackbarClass) { }

  ngOnInit() {
    this.userService.getUserInfo();
    setTimeout(() => {
      if (!this.userService.verfied) {
        this.snackbar.openSnackBar('Bitte E-Mail bestätigen!', 'Check', 2500);
      }
    }, 100);
  }

  updateUser(form: NgForm) {
    this.userService.updateUser(form);
  }

  sendVerification() {
    this.userService.sendVerification();
    this.snackbar.openSnackBar('Eine Bestätigungsemail wurde versandt.', 'Check', 2500);
  }

  onSignout() {
    this.authService.logout();
  }
}
