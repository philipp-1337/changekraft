import { Component } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { matchOtherValidator } from 'src/app/shared/matchOtherValidator.function'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [SnackbarClass]
})
export class RegisterComponent {

  hide1 = true;
  hide2 = true;
  disabled = false;
  signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(12)]],
    confirm_password: ['', [Validators.required, matchOtherValidator('password')]]
  });

  constructor(private authservice: AuthService,
    private fb: UntypedFormBuilder,
    private snackbar: SnackbarClass,
    private router: Router,
    private userService: UserService) { }

  onSignup() {
    const email = this.signUpForm.controls['email'].value;
    const password = this.signUpForm.controls['password'].value;
    const confirmPassword = this.signUpForm.controls['confirm_password'].value;
    if (password !== confirmPassword) {
      this.snackbar.openSnackBar('Die Passwörter stimmen nicht überein.', 'Ok', 2500);
      return;
    }
    this.disabled = true;
    this.authservice.signupUser(email, password)
      .then(response => {
        this.userService.sendVerification();
        //this.snackbar.openSnackBar('Registrierung erfolgreich & Bestätigungsemail versandt.', 'Ok', 2500);
        this.router.navigate(['/admin/profile']);
      })
      .catch(error => {
        console.log(error.message);
        if (error.code === 'auth/weak-password') {
          this.snackbar.openSnackBar('Das Passwort sollte mindestens 6 Zeichen lang sein.', 'Ok', 0);
        } else if (error.code === 'auth/email-already-in-use') {
          this.snackbar.openSnackBar('Die E-Mail-Adresse wird bereits verwendet.', 'Ok', 0);
        } else {
          this.snackbar.openSnackBar('Ein Fehler ist aufgetreten.', 'Ok', 2500);
        }
        this.disabled = false;
      });
  }
}
