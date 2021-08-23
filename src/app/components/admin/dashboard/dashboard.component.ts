import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container pb-3">
    <app-user-profil></app-user-profil>
    <app-events></app-events>
    </div>
    <div class="fab position-fixed">
      <button
        mat-fab
        color="primary"
        aria-label="Event hinzufügen"
        routerLink="/admin/add-event"
        routerLinkActive="active">
        <mat-icon svgIcon="add"></mat-icon>
      </button>
    </div>
  `,
  styles: [
  ]
})
export class DashboardComponent {

  constructor() { }

}
