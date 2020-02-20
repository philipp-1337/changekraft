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
        this.snackbar.openSnackBar('E-Mail bereits in Benutzung.', 'Ok', 2500);
        this.disabled = false;
      });
  }
}
