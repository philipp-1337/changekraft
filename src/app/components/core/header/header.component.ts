import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatDrawer } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/app/app.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class HeaderComponent implements AfterViewInit {
  // isHandset$: Observable<boolean> = this.breakpointObserver
  //   .observe(Breakpoints.Handset)
  //   .pipe(map(result => result.matches));

  isBigScreen$: Observable<boolean> = this.breakpointObserver
    .observe(['(min-width: 961px)'])
    .pipe(map(result => result.matches));

  @ViewChild('drawer') drawer: MatDrawer;

  navigation = [
    {
      name: 'Location',
      route: '/home',
      icon: 'location_on'
    },
    {
      name: 'Übernachtung',
      route: '/home',
      icon: 'hotel'
    },
    {
      name: 'Verpflegung',
      route: '/home',
      icon: 'local_dining'
    },
    {
      name: 'Anfahrt',
      route: '/home',
      icon: 'commute'
    },
    {
      name: 'Programm',
      route: '/home',
      icon: 'event'
    },
    {
      name: 'Anmeldung',
      route: '/rsvp',
      icon: 'loyalty'
    }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _focusMonitor: FocusMonitor,
    public authService: AuthService
  ) {}

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

  ngAfterViewInit() {
    this._focusMonitor.stopMonitoring(document.getElementById('drawerButton'));
  }

  onLogout() {
    this.authService.logout();
  }
}
