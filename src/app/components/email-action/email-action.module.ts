import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailActionRoutingModule } from './email-action-routing.module';
import { HandlerComponent } from './handler/handler.component';
import { EmailActionComponent } from './email-action.component';


@NgModule({
  declarations: [HandlerComponent, EmailActionComponent],
  imports: [
    CommonModule,
    EmailActionRoutingModule
  ]
})
export class EmailActionModule { }
