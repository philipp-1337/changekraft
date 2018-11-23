import { Component, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.scss']
})
// export class MyNavComponent implements AfterViewInit {
export class MyNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}

  // constructor(
  //   private breakpointObserver: BreakpointObserver,
  //   private _focusMonitor: FocusMonitor
  // ) {}

  // ngAfterViewInit() {
  //   this._focusMonitor.stopMonitoring(document.getElementById('navButton_1'));
  // }
}
