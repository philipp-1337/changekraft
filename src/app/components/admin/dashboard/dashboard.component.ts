import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container pb-3">
      <div class="row">
        <app-user-profil class="col-md-6 col-12 mt-3"></app-user-profil>
        <app-events class="col-md-6 col-12 mt-3"></app-events>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class DashboardComponent {

  constructor() { }

}
