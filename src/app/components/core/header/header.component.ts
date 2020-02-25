import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { RouterOutlet } from '@angular/router';
import { IconsClass } from 'src/app/shared/icons.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [IconsClass]
})
export class HeaderComponent {
  constructor(
    public authservice: AuthService,
    public icons: IconsClass
  ) { }

  @ViewChild('drawer', { static: false }) drawer: MatDrawer;

  rsvp = [
    {
      name: 'Profil',
      route: '/admin/profile',
      icon: 'account_circle_outline'
    },
    {
      name: 'Events',
      route: '/admin/event-list',
      icon: 'supervisor_account_outline'
    },
    {
      name: 'Neues Event',
      route: '/admin/add-event',
      icon: 'event'
    }
  ];

  bottomBar = [
    {
      name: 'Events',
      route: '/admin/event-list',
      icon: 'supervisor_account_outline'
    },
    {
      name: 'Neues Event',
      route: '/admin/add-event',
      icon: 'event'
    },
    {
      name: 'Neues Event',
      route: '/admin/add-event',
      icon: 'event'
    }
  ];

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData
    );
  }

  toggleDrawer() {
    this.drawer.toggle();
  }

  onLogout() {
    this.authservice.logout();
  }
}
