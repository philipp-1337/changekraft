import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './login/login.component';
import { AdminRegisterComponent } from './register/register.component';
import { AdminTestComponent } from './test/test.component';
import { AdminZusagenComponent } from './zusagen/zusagen.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { ExcelService } from '../../services/excel.service';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule, MaterialModule],
  declarations: [
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminTestComponent,
    AdminZusagenComponent
  ],
  providers: [ExcelService]
})
export class AdminModule {}
