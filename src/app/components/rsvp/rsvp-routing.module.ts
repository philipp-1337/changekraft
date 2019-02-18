import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { RsvpComponent } from './rsvp.component';

const rsvpRoutes: Routes = [
  {
    path: '',
    component: RsvpComponent,
    data: { animation: 'RsvpPage' },
    children: [
      {
        path: '',
        component: AnmeldungComponent,
        data: { animation: 'AnmeldungPage' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rsvpRoutes)],
  exports: [RouterModule]
})
export class RsvpRoutingModule {}
