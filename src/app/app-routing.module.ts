import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZusagenComponent } from './pages/zusagen/zusagen.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';

const routes: Routes = [
  { path: 'anmeldung', component: RsvpComponent },
  { path: 'zusagen', component: ZusagenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
