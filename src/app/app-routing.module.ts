import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZusagenComponent } from './pages/zusagen/zusagen.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { HomeComponent } from './pages/home/home.component';
import { SuccessComponent } from './pages/rsvp/success/success.component';
import { CancellationComponent } from './pages/rsvp/cancellation/cancellation.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/' },
  { path: 'anmeldung', component: RsvpComponent },
  { path: 'anmeldung/success', component: SuccessComponent },
  { path: 'anmeldung/cancellation', component: CancellationComponent },
  {
    path: 'zusagen',
    component: ZusagenComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: HomeComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
