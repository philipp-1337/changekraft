import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminZusagenComponent } from './zusagen/zusagen.component';
import { AdminLoginComponent } from './login/login.component';
import { AdminRegisterComponent } from './register/register.component';
import { AuthGuard } from '../../services/auth-guard.service';
import { AdminTestComponent } from './test/test.component';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminLoginComponent },
  { path: 'admin/zusagen', component: AdminZusagenComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/test', component: AdminTestComponent },
  { path: 'admin/register', component: AdminRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
