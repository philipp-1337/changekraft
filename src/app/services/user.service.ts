import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authservice: AuthService) { }

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
      .then(user => {
        console.log('User updated');
        this.getUserInfo();
        this.authservice.updateUserData(this.user);
      })
      .catch(error => {
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
      }
    });
  }

}
