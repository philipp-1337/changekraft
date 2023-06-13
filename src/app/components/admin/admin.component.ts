import { AfterViewInit, ChangeDetectorRef, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { routerTransition } from "src/app/shared/route-animations";

@Component({
  selector: "app-core",
  template: `
    <main [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
  `,
  animations: [routerTransition],
})
export class AdminComponent implements AfterViewInit {
  constructor(private changeRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.changeRef.detectChanges();
 }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet?.activatedRouteData["animation"]
    );
  }

}
