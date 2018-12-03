import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatDrawer } from '@angular/material';

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
  ) {}


  toggleOnlyMobile() {
    if (this.breakpointObserver.isMatched('(max-width: 599px)')) {
      this.drawer.toggle();
    }
  }

  ngAfterViewInit() {
    this._focusMonitor.stopMonitoring(document.getElementById('drawerButton'));
  }
}
