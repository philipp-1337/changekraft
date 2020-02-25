import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root',
})


export class AuthService {
  public token: string;
  lorem = false;
  user: Observable<User>;

  get getToken(): string {
    return this.token;
  }

  constructor(private router: Router, public afAuth: AngularFireAuth, private afs: AngularFirestore, ) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public authChange_$(): firebase.Unsubscribe {
    return this.afAuth.auth.onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.getUserToken();
      } else {
        this.token = null;
      }
    });
  }

  updateUserData(user: User) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  async signupUser(email: string, password: string) {
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async signinUser(email: string, password: string) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.updateUserData(credential.user);
    this.getUserToken();
  }

  getUserToken() {
    this.afAuth.auth.currentUser.getIdToken()
      .then(token => (this.token = token));
    return this.token;
  }

  getCurrentUser() {
    const currentUser = this.afAuth.auth.currentUser;
    return currentUser;
  }

  getCredential(email: string, password: string) {
    const credentials = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return credentials;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
    this.token = null;
    localStorage.removeItem('token');
  }
}
