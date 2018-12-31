import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { ExcelService } from '../../services/excel.service';

import { AdminComponent } from './admin.component';
import { AdminZusagenComponent } from './zusagen/zusagen.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule, MaterialModule],
  declarations: [AdminComponent, AdminZusagenComponent],
  providers: [ExcelService]
})
export class AdminModule {}
