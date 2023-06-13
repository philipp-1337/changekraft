import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExcelService } from 'src/app/services/excel.service';
import { AdminComponent } from './admin.component';
import { AdminZusagenComponent } from './zusagen/zusagen.component';
import { DialogDeleteComponent } from 'src/app/shared/dialog-delete/dialog-delete.component';
import { DialogShareComponent } from 'src/app/shared/dialog-share/dialog-share.component';
import { DialogWarningComponent } from 'src/app/shared/dialog-warning/dialog-warning.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
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
import { DialogEmailUpdateComponent } from './user-profil/dialog-email-update.component';

@NgModule({
    imports: [CommonModule, AdminRoutingModule, SharedModule, MaterialModule, MatMomentDateModule],
    declarations: [
        AdminComponent,
        AdminZusagenComponent,
        DialogDeleteComponent,
        DialogShareComponent,
        DialogWarningComponent,
        AddEventComponent,
        EditEventComponent,
        EventsComponent,
        UserProfilComponent,
        DialogUserDeleteComponent,
        DialogEmailUpdateComponent,
        DashboardComponent
    ],
    providers: [
        ExcelService,
        AngularFireAuthGuard,
        { provide: DateAdapter, useClass: GermanWeek },
        { provide: DateAdapter, useClass: MomentDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: GERMAN_DATE_FORMAT },
        { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }
    ]
})
export class AdminModule { }
