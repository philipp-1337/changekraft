import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/core/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './components/core/login/login.component';
import { RegisterComponent } from './components/core/register/register.component';

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
      './components/information/information.module#InformationModule',
  },
  {
    path: 'rsvp',
    loadChildren: './components/rsvp/rsvp.module#RsvpModule',
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
    loadChildren: './components/admin/admin.module#AdminModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  { path: '404', component: HomeComponent },
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
