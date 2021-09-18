import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UpdateService } from './services/update.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  template: '<app-header></app-header>'
})
export class AppComponent implements OnInit, OnDestroy {
  name = '';
  authUnsub: firebase.Unsubscribe;
  constructor(
    private authservice: AuthService,
    private router: Router,
    private update: UpdateService,
    firestore: AngularFirestore
  ) { }

  ngOnInit() {
    // console.log(this.authUnsub);
    this.authservice.authChange_$();
    // console.log(this.authUnsub);

    const headers = new HttpHeaders({ 'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict' });

    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy() {
    this.authUnsub();
  }
}
