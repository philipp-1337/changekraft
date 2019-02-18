import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './information.component';
import { EventComponent } from './event/event.component';

const informationRoutes: Routes = [
  {
    path: '',
    component: InformationComponent,
    data: { animation: 'InfoPages' },
    children: [
      {
        path: '',
        component: EventComponent,
        data: { animation: 'EventPage' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(informationRoutes)],
  exports: [RouterModule]
})
export class InformationRoutingModule {}
