import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminZusagenComponent } from './zusagen/zusagen.component';
import { AuthGuard } from '../../services/auth-guard.service';
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { animation: 'AdminPage' },
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
