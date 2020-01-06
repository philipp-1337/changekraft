import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { RsvpComponent } from './rsvp.component';

const rsvpRoutes: Routes = [
  {
    path: '',
    component: RsvpComponent,
    children: [
      {
        path: '',
        component: AnmeldungComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rsvpRoutes)],
  exports: [RouterModule]
})
export class RsvpRoutingModule { }
