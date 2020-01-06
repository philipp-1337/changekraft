import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public icons: IconsClass
  ) { }

  isBigScreen$: Observable<boolean> = this.breakpointObserver
    .observe(['(min-width: 961px)'])
    .pipe(map(result => result.matches));

  @ViewChild('drawer', { static: false }) drawer: MatDrawer;

  navigation = [
    {
      name: 'Location',
      route: '/event',
      fragment: 'location',
      icon: 'location_on'
    },
    {
      name: 'Übernachtung',
      route: '/event',
      fragment: 'stay',
      icon: 'hotel'
    },
    {
      name: 'Verpflegung',
      route: '/event',
      fragment: 'food',
      icon: 'local_dining'
    },
    {
      name: 'Anfahrt',
      route: '/event',
      fragment: 'transport',
      icon: 'commute'
    },
    {
      name: 'Programm',
      route: '/event',
      fragment: 'event',
      icon: 'event'
    },
    {
      name: 'Anmeldung',
      route: '/rsvp',
      fragment: 'anmeldung',
      icon: 'loyalty'
    }
  ];

  navigation2 = [
    {
      name: 'Location',
      route: '/event/location',
      icon: 'location_on'
    },
    {
      name: 'Übernachtung',
      route: '/event/stay',
      icon: 'hotel'
    },
    {
      name: 'Verpflegung',
      route: '/event/food',
      icon: 'local_dining'
    },
    {
      name: 'Anfahrt',
      route: '/event/transportation',
      icon: 'commute'
    },
    {
      name: 'Programm',
      route: '/event/program',
      icon: 'event'
    },
    {
      name: 'Anmeldung',
      route: '/rsvp',
      icon: 'loyalty'
    }
  ];

  rsvp = [
    {
      name: 'Profil',
      route: '/login',
      icon: 'account_circle_outline'
    },
    {
      name: 'Zusagen',
      route: '/admin/zusagen',
      icon: 'supervisor_account_outline'
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
    this.authService.logout();
  }
}
