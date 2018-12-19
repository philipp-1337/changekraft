import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { HomeComponent } from './pages/home/home.component';
import { SuccessComponent } from './pages/rsvp/success/success.component';
import { CancellationComponent } from './pages/rsvp/cancellation/cancellation.component';
import { AdminModule } from './components/admin/admin.module';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/' },
  {
    path: 'anmeldung',
    component: RsvpComponent,
    children: [
      {
        path: 'success',
        component: SuccessComponent,
      },
      {
        path: 'cancellation',
        component: CancellationComponent,
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    loadChildren: './components/admin/admin.module#AdminModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: '404', redirectTo: '/' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
