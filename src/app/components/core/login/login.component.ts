import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [SnackbarClass]
})
export class LoginComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public snackbar: SnackbarClass,
    private router: Router
  ) { }

  loginError: string;
  userNotFound: boolean;
  wrongPassword: boolean;
  randomError: boolean;
  disabled = false;
  hide = true;

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/admin/profile');
    }
  }

  onSignin(form: NgForm) {
    this.disabled = true;
    this.userNotFound = false;
    this.wrongPassword = false;
    this.randomError = false;
    const email = form.value.email;
    const password = form.value.password;
    this.authService
      .signinUser(email, password)
      .then(response => {
        this.router.navigateByUrl('/admin/profile');
      })
      .catch(error => {
        console.log(error);
        this.loginError = error.code;
        this.defineError();
        this.disabled = false;
      });
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
