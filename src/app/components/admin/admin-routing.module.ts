import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminZusagenComponent } from './zusagen/zusagen.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { AddEventComponent } from './add-event/add-event.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'zusagen',
        pathMatch: 'full'
      },
      {
        path: 'zusagen',
        component: AdminZusagenComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'add-event',
        component: AddEventComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
