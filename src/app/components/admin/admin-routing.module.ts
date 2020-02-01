import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminZusagenComponent } from './zusagen/zusagen.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventListComponent } from './event-list/event-list.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'add-event',
        component: AddEventComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'event-list',
        component: EventListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit-event/:eventId',
        component: EditEventComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'zusagen',
        component: AdminZusagenComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
