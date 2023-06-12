import { Component } from "@angular/core";
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
export class CoreComponent {
  constructor() {}
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }
}
