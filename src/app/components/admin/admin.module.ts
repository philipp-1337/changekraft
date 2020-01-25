import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ExcelService } from 'src/app/services/excel.service';
import { AdminComponent } from './admin.component';
import { AdminZusagenComponent } from './zusagen/zusagen.component';
import { DialogDeleteComponent } from './zusagen/dialog-delete.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventListComponent } from './event-list/event-list.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule, MaterialModule],
  declarations: [AdminComponent, AdminZusagenComponent, DialogDeleteComponent, AddEventComponent, EditEventComponent, EventListComponent],
  providers: [ExcelService],
  entryComponents: [DialogDeleteComponent]
})
export class AdminModule { }
