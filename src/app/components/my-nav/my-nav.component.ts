import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatDrawer } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.scss']
})
export class MyNavComponent implements AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  @ViewChild('drawer') drawer: MatDrawer;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _focusMonitor: FocusMonitor,
    public authService: AuthService,
  ) {}

  showToggle() {
    if (!this.breakpointObserver.isMatched('(min-width: 960px)')) {
      return true;
    }
  }

  toggleOnlyMobile() {
    if (
      this.breakpointObserver.isMatched('(max-width: 599px)') ||
      (this.breakpointObserver.isMatched('(min-width: 599px)') &&
        this.breakpointObserver.isMatched('(max-width: 960px)'))
    ) {
      this.drawer.toggle();
    }
  }

  ngAfterViewInit() {
    this._focusMonitor.stopMonitoring(document.getElementById('drawerButton'));
  }

  onLogout() {
    this.authService.logout();
  }
}
