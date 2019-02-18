import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { InformationComponent } from './information.component';
import { EventComponent } from './event/event.component';

@NgModule({
  imports: [
    CommonModule,
    InformationRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [InformationComponent, EventComponent]
})
export class InformationModule {}
