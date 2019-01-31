import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user: firebase.User;
  email: string;
  name: string;
  verfied: boolean;

  updateUser(form: NgForm) {
    this.name = form.value.displayname;
    this.user = firebase.auth().currentUser;
    this.user
      .updateProfile({
        displayName: this.name,
        photoURL: ''
      })
      .then(function () {
        console.log('User updated');
        console.log(this.user);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  sendVerification() {
    this.user = firebase.auth().currentUser;
    this.user
      .sendEmailVerification()
      .then(function () {
        console.log('Email sent');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.email = user.email;
        this.name = user.displayName;
        this.verfied = user.emailVerified;
        console.log(user);
      }
    });
  }

}
