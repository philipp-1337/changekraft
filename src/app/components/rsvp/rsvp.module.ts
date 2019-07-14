import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GermanWeek } from 'src/app/shared/germanWeek.class';

import { RsvpRoutingModule } from './rsvp-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { RsvpComponent } from './rsvp.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';

import {
  MatMomentDateModule,
  MomentDateAdapter
} from '@angular/material-moment-adapter';

import { GERMAN_DATE_FORMAT } from 'src/app/shared/germanDate.const';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    RsvpRoutingModule,
    SharedModule,
    MaterialModule,
    MatMomentDateModule
  ],
  declarations: [RsvpComponent, AnmeldungComponent],
  providers: [
    { provide: DateAdapter, useClass: GermanWeek },
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: GERMAN_DATE_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }
  ]
})
export class RsvpModule { }
