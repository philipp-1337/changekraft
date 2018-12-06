import { Component, OnInit, OnDestroy } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  name = '';
  authUnsub: firebase.Unsubscribe;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log('firebase init');
    firebase.initializeApp({
      apiKey: 'AIzaSyBq3dEPKL4y2rp2QwvWst1LZysjBzhsIWY',
      authDomain: 'wildwildwuerlich.firebaseapp.com'
    });
    this.authUnsub = this.authService.authChange_$();
  }

  ngOnDestroy() {
    this.authUnsub();
  }
}
