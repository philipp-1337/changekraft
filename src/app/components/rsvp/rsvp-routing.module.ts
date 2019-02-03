import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { SuccessComponent } from './success/success.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { RsvpComponent } from './rsvp.component';

const rsvpRoutes: Routes = [
  {
    path: '',
    component: RsvpComponent,
    data: { animation: 'RsvpPage' },
    children: [
      {
        path: '',
        redirectTo: 'anmeldung',
        pathMatch: 'full'
      },
      {
        path: 'anmeldung',
        component: AnmeldungComponent
      },
      {
        path: 'success',
        component: SuccessComponent
      },
      {
        path: 'cancellation',
        component: CancellationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rsvpRoutes)],
  exports: [RouterModule]
})
export class RsvpRoutingModule {}
