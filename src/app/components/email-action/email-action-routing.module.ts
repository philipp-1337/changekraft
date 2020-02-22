import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailActionComponent } from './email-action.component';
import { HandlerComponent } from './handler/handler.component';


const emailActionRoutes: Routes = [
  {
    path: '',
    component: EmailActionComponent,
    children: [
      {
        path: '',
        component: HandlerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(emailActionRoutes)],
  exports: [RouterModule]
})
export class EmailActionRoutingModule { }
