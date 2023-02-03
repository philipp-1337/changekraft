import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/core/home/home.component';
import { LoginComponent } from './components/core/login/login.component';
import { RegisterComponent } from './components/core/register/register.component';
import { EventDetailComponent } from './components/core/event-detail/event-detail.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { NotFoundComponent } from './components/core/not-found/not-found.component';
import { PasswordResetComponent } from './components/core/password-reset/password-reset.component';
import { RsvpModule } from './components/rsvp/rsvp.module';
import { EmailActionModule } from './components/email-action/email-action.module';
import { AdminModule } from './components/admin/admin.module';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToProfile = () => redirectLoggedInTo(['admin/profile']);



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
    path: 'event/:eventUrl',
    component: EventDetailComponent,
  },
  {
    path: 'event/:eventUrl/rsvp',
    component: RsvpModule,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToProfile }

  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToProfile }
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent
  },
  {
    path: 'email/action',
    component: EmailActionModule,
  },
  {
    path: 'admin',
    component: AdminModule,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: '404', component: NotFoundComponent },
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
