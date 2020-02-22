import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { EmailActionRoutingModule } from './email-action-routing.module';
import { HandlerComponent } from './handler/handler.component';
import { EmailActionComponent } from './email-action.component';


@NgModule({
  imports: [
    CommonModule,
    EmailActionRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  declarations: [HandlerComponent, EmailActionComponent]
})
export class EmailActionModule { }
