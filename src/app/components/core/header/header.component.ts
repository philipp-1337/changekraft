import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { IconsClass } from 'src/app/shared/icons.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [IconsClass]
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public authservice: AuthService,
    public icons: IconsClass,
  ) { }

  @ViewChild('drawer', { static: false }) drawer: MatDrawer;

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData
    );
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
