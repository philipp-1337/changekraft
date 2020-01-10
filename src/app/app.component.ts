import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<app-header></app-header>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  name = '';
  // authUnsub: firebase.Unsubscribe;
  constructor(
    private authService: AuthService, 
    private router: Router
    ) { }

  ngOnInit() {
    // this.authUnsub = this.authService.authChange_$();

    // this.router.events.subscribe(evt => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    //   window.scrollTo(0, 0);
    // });
  }

  ngOnDestroy() {
    // this.authUnsub();
  }
}
