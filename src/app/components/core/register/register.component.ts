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

  constructor(private authService: AuthService, private snackbar: SnackbarClass, private router: Router) { }

  ngOnInit() { }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password)
      .then(response => {
        this.router.navigate(['/admin/profile']);
        this.snackbar.openSnackBar('Registrierung erfolgreich.', 'Check');
      })
      .catch(error => {
        this.snackbar.openSnackBar('E-Mail bereits in Benutzung.', 'Check');
      });
  }
}
