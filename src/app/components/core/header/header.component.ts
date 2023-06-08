import { Component, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { IconsClass } from 'src/app/shared/icons.class';
import { routerTransition } from 'src/app/route-animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [IconsClass],
  animations: [
    routerTransition,
    trigger('primaryToAccent', [
      state('true', style({ transform: 'rotate(0deg)', background: '#00897b' })),
      state('false', style({ transform: 'rotate(-225deg)', background: '#b71c1c' })),
      transition('0 <=> 1', animate('200ms ease'))
    ]),
    trigger('accentToPrimary', [
      state('true', style({ transform: 'rotate(-225deg)', background: '#b71c1c' })),
      state('false', style({ transform: 'rotate(0deg)', background: '#00897b' })),
      transition('0 <=> 1', animate('200ms ease'))
    ])
  ]
})
export class HeaderComponent {
  primaryState: boolean = true;
  accentState: boolean = true;
  constructor(
    private router: Router,
    public authservice: AuthService,
    public icons: IconsClass,
  ) { }

  @ViewChild('drawer', { static: false }) drawer: MatDrawer;

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  navigateToEventEditScreen() {
    this.primaryState = false;
    setTimeout(() => {
      this.router.navigate(['./admin/add-event']);
      this.primaryState = true;
    }, 200);
  }
  navigateToDashboardAndCancel() {
    this.accentState = false;
    setTimeout(() => {
      this.router.navigate(['./admin/dashboard']);
      this.accentState = true;
    }, 200);
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

  toggleDrawer() {
    this.drawer.toggle();
  }

  onLogout() {
    this.authservice.logout();
  }
}
