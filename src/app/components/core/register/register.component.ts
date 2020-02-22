import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [SnackbarClass]
})
export class RegisterComponent implements OnInit {

  hide = true;
  disabled = false;

  constructor(private authService: AuthService, private snackbar: SnackbarClass, private router: Router) { }

  ngOnInit() { }

  onSignup(form: NgForm) {
    this.disabled = true;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password)
      .then(response => {
        this.router.navigate(['/admin/profile']);
        this.snackbar.openSnackBar('Registrierung erfolgreich.', 'Ok', 2500);
      })
      .catch(error => {
        console.log(error.message);
        if (error.code === 'auth/weak-password') {
          this.snackbar.openSnackBar('Das Passwort sollte mindestens 6 Zeichen lang sein.', 'Ok', 2500);
        } else if (error.code === 'auth/email-already-in-use') {
          this.snackbar.openSnackBar('Die E-Mail-Adresse wird bereits von einem anderen Konto verwendet.', 'Ok', 2500);
        } else {
          this.snackbar.openSnackBar('Ein Fehler ist aufgetreten.', 'Ok', 2500);
        }
        this.disabled = false;
      });
  }
}
