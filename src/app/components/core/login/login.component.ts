import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [SnackbarClass]
})
export class LoginComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public snackbar: SnackbarClass,
    public userService: UserService
  ) { }

  loginError: string;
  userNotFound: boolean;
  wrongPassword: boolean;
  randomError: boolean;

  verfied = this.userService.verfied;

  hide = true;

  isLoading = false;

  ngOnInit() {
    this.userService.getUserInfo();
  }

  updateUser(form: NgForm) {
    this.userService.updateUser(form);
  }

  sendVerification() {
    this.userService.sendVerification();
  }

  onSignin(form: NgForm) {
    this.userNotFound = false;
    this.wrongPassword = false;
    this.randomError = false;
    this.isLoading = true;
    console.log('all errors reset.');
    const email = form.value.email;
    const password = form.value.password;
    this.authService
      .signinUser(email, password)
      .catch(error => {
        console.log(error);
        this.loginError = error.code;
        this.defineError();
      })
      .then(response => {
        this.isLoading = false;
      });
  }

  onSignout() {
    this.authService.logout();
  }

  defineError() {
    if (this.loginError === 'auth/user-not-found') {
      this.userNotFound = true;
      this.snackbar.openSnackBar(
        'Bitte überprüfe die E-Mail-Adresse.',
        'Schließen'
      );
      console.log('User not found.');
    } else if (this.loginError === 'auth/wrong-password') {
      this.wrongPassword = true;
      this.snackbar.openSnackBar('Bitte überprüfe das Passwort.', 'Schließen');
      console.log('Wrong password.');
    } else {
      this.randomError = true;
      this.snackbar.openSnackBar(
        'Bitte überprüfe deine Eingaben.',
        'Schließen'
      );
      console.log('Random error occured.');
    }
  }
}
