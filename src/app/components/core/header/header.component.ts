import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { IconsClass } from 'src/app/shared/icons.class';
import { routerTransition } from 'src/app/shared/route-animations';
import { accentToPrimary, primaryToAccent } from 'src/app/shared/color-animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [IconsClass],
  animations: [
    routerTransition,
    primaryToAccent,
    accentToPrimary
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
