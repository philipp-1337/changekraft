import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExcelService } from 'src/app/services/excel.service';
import { AdminComponent } from './admin.component';
import { AdminZusagenComponent } from './zusagen/zusagen.component';
import { DialogDeleteComponent } from 'src/app/shared/dialog-delete/dialog-delete.component';
import { DialogShareComponent } from './event-list/dialog-share.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventsComponent } from './events/events.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { GermanWeek } from 'src/app/shared/germanWeek.class';
import { GERMAN_DATE_FORMAT } from 'src/app/shared/germanDate.const';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MatMomentDateModule,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { DialogUserDeleteComponent } from './user-profil/dialog-user-delete.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule, MaterialModule, MatMomentDateModule],
  declarations: [
    AdminComponent,
    AdminZusagenComponent,
    DialogDeleteComponent,
    DialogShareComponent,
    AddEventComponent,
    EditEventComponent,
    EventListComponent,
    EventsComponent,
    UserProfilComponent,
    DialogUserDeleteComponent,
    DashboardComponent
  ],
  providers: [
    ExcelService,
    AngularFireAuthGuard,
    { provide: DateAdapter, useClass: GermanWeek },
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: GERMAN_DATE_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }
  ],
  entryComponents: [DialogDeleteComponent, DialogShareComponent]
})
export class AdminModule { }
