import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZusagenComponent } from './pages/zusagen/zusagen.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { HomeComponent } from './pages/home/home.component';
import { SuccessComponent } from './pages/rsvp/success/success.component';
import { CancellationComponent } from './pages/rsvp/cancellation/cancellation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'anmeldung', component: RsvpComponent },
  { path: 'anmeldung/success', component: SuccessComponent },
  { path: 'anmeldung/cancellation', component: CancellationComponent },
  { path: 'zusagen', component: ZusagenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
