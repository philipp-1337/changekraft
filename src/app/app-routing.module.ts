import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/core/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './components/core/login/login.component';
import { RegisterComponent } from './components/core/register/register.component';
import { EventDetailComponent } from './components/core/event-detail/event-detail.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'event',
    loadChildren:
      () => import('./components/information/information.module').then(m => m.InformationModule),
  },
  {
    path: 'event/:eventUrl',
    component: EventDetailComponent,
  },
  {
    path: 'event/:eventUrl/rsvp',
    loadChildren: () => import('./components/rsvp/rsvp.module').then(m => m.RsvpModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  { path: '404', component: LoginComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
