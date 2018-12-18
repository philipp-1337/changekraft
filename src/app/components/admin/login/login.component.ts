import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  hide = true;

  ngOnInit() {}

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }
}
