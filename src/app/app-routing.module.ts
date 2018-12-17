import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { HomeComponent } from './pages/home/home.component';
import { SuccessComponent } from './pages/rsvp/success/success.component';
import { CancellationComponent } from './pages/rsvp/cancellation/cancellation.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/' },
  { path: 'anmeldung', component: RsvpComponent },
  { path: 'anmeldung/success', component: SuccessComponent },
  { path: 'anmeldung/cancellation', component: CancellationComponent },
  {
    path: 'admin',
    loadChildren: './rsvp/admin/admin.module#AdminModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: '404', component: HomeComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
