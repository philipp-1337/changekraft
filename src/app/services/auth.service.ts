import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _token: string;

  get token(): string {
    return this._token;
  }

  loggedIn = false;
  constructor(private router: Router) {}

  public authChange_$(): firebase.Unsubscribe {
    return firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.getToken();
      } else {
        this._token = null;
      }
    });
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signinUser(email: string, password: string) {
    this.loggedIn = true;
    const authObject = firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => (this._token = token));
      })
      .catch(error => {
        console.log(error);
      });
    return authObject;
  }

  getToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token: string) => (this._token = token))
      .catch(error => {
        console.log(error);
      });
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    this.router.navigate(['/login']);
    this._token = null;
    this.loggedIn = false;
    firebase.auth().signOut();
  }
}
