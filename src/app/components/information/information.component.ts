import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/app.animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-information',
  template: `
    <div [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
  `,
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class InformationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
