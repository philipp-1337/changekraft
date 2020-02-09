import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminZusagenComponent } from './zusagen/zusagen.component';
import { AdminComponent } from './admin.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventListComponent } from './event-list/event-list.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { UserProfilComponent } from './user-profil/user-profil.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'profile',
        component: UserProfilComponent,
        canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'add-event',
        component: AddEventComponent,
        canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'event-list',
        component: EventListComponent,
        canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'edit-event/:eventId',
        component: EditEventComponent,
        canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'zusagen/:eventId',
        component: AdminZusagenComponent,
        canActivate: [AngularFireAuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
