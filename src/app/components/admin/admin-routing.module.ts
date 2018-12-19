import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminZusagenComponent } from './zusagen/zusagen.component';
import { AuthGuard } from '../../services/auth-guard.service';
import { AdminTestComponent } from './test/test.component';
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'zusagen',
        component: AdminZusagenComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'test',
        component: AdminTestComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
