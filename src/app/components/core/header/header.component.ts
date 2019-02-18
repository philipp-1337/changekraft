import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatDrawer } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { slideInAnimation } from 'src/app/app.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideInAnimation]
})
export class HeaderComponent {
  isBigScreen$: Observable<boolean> = this.breakpointObserver
    .observe(['(min-width: 961px)'])
    .pipe(map(result => result.matches));

  @ViewChild('drawer') drawer: MatDrawer;

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _focusMonitor: FocusMonitor,
    public authService: AuthService,
    router: Router
  ) {
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) {
            element.scrollIntoView({
              inline: 'start',
              block: 'start',
              behavior: 'smooth'
            });
          }
        }
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  toggleDrawer() {
    this.drawer.toggle();
  }

  onLogout() {
    this.authService.logout();
  }
}
