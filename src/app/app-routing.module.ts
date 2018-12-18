import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { HomeComponent } from './pages/home/home.component';
import { SuccessComponent } from './pages/rsvp/success/success.component';
import { CancellationComponent } from './pages/rsvp/cancellation/cancellation.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminModule } from './components/admin/admin.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/' },
  { path: 'anmeldung', component: RsvpComponent },
  { path: 'anmeldung/success', component: SuccessComponent },
  { path: 'anmeldung/cancellation', component: CancellationComponent },
  {
    path: 'admin',
    loadChildren: () => AdminModule,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: '404', redirectTo: '/' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
