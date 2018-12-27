import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService) {}

  loginError: string;
  userNotFound: boolean;
  wrongPassword: boolean;
  randomError: boolean;

  hide = true;

  user: firebase.User;
  email: string;
  name: string;
  verfied: boolean;

  ngOnInit() {
    this.getUserInfo();
  }

  updateUser(form: NgForm) {
    this.name = form.value.displayname;
    this.user = firebase.auth().currentUser;
    this.user
      .updateProfile({
        displayName: this.name,
        photoURL: ''
      })
      .then(function() {
        // Update successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  }

  sendVerification() {
    this.user = firebase.auth().currentUser;
    this.user
      .sendEmailVerification()
      .then(function() {
        console.log('Email sent');
      })
      .catch(function(error) {
        // An error happened.
      });
  }

  getUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // this.user = user;
        this.email = user.email;
        this.name = user.displayName;
        this.verfied = user.emailVerified;
        console.log(user);
        console.log(this.name);
        console.log(this.email);
      }
    });
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password).catch(error => {
      this.loginError = error.code;
      this.defineError();
    });
  }

  onSignout() {
    this.authService.logout();
  }

  defineError() {
    this.userNotFound = false;
    this.wrongPassword = false;
    this.randomError = false;
    if (this.loginError === 'auth/user-not-found') {
      this.userNotFound = true;
    } else if (this.loginError === 'auth/wrong-password') {
      this.wrongPassword = true;
    } else {
      this.randomError = true;
    }
  }
}
