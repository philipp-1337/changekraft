import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [SnackbarClass]
})
export class RegisterComponent {

  hide = true;
  disabled = false;
  signinForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private authservice: AuthService,
    private fb: FormBuilder,
    private snackbar: SnackbarClass,
    private router: Router,
    private userService: UserService) { }

  onSignup() {
    const email = this.signinForm.controls['email'].value;
    const password = this.signinForm.controls['password'].value;
    this.disabled = true;
    this.authservice.signupUser(email, password)
      .then(response => {
        // this.userService.sendVerification();
        // this.snackbar.openSnackBar('Registrierung erfolgreich & Bestätigungsemail versandt.', 'Ok', 2500);
        this.router.navigate(['/admin/profile']);
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
