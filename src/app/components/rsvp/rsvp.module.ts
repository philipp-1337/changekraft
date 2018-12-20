import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RsvpRoutingModule } from './rsvp-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { RsvpComponent } from './rsvp.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { SuccessComponent } from './success/success.component';
import { CancellationComponent } from './cancellation/cancellation.component';

@NgModule({
  imports: [CommonModule, RsvpRoutingModule, SharedModule, MaterialModule],
  declarations: [RsvpComponent, AnmeldungComponent, SuccessComponent, CancellationComponent]
})
export class RsvpModule { }
