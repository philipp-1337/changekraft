import {
  ChangeDetectorRef,
  Component,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.scss']
})
export class MyNavComponent implements AfterViewInit, OnDestroy {
  mobileQuery: MediaQueryList;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  private _mobileQueryListener: () => void;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _focusMonitor: FocusMonitor,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    this._focusMonitor.stopMonitoring(document.getElementById('navButton_1'));
  }
}
