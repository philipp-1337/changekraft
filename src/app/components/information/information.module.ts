import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { InformationComponent } from './information.component';
import { EventComponent } from './event/event.component';

import { LocationComponent } from './location/location.component';
import { StayComponent } from './stay/stay.component';
import { FoodComponent } from './food/food.component';
import { TransportationComponent } from './transportation/transportation.component';
import { ProgramComponent } from './program/program.component';

@NgModule({
  imports: [
    CommonModule,
    InformationRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [
    InformationComponent,
    EventComponent,
    LocationComponent,
    StayComponent,
    FoodComponent,
    TransportationComponent,
    ProgramComponent
  ]
})
export class InformationModule {}
