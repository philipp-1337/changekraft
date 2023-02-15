import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminZusagenComponent } from './zusagen/zusagen.component';
import { AdminComponent } from './admin.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, emailVerified } from '@angular/fire/compat/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'profile',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'add-event',
        component: AddEventComponent,
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin, emailVerified }
      },
      {
        path: 'edit-event/:eventId',
        component: EditEventComponent,
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'zusagen/:eventId',
        component: AdminZusagenComponent,
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
