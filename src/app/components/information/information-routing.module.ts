import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './information.component';
import { LocationComponent } from './location/location.component';
import { StayComponent } from './stay/stay.component';
import { FoodComponent } from './food/food.component';
import { TransportationComponent } from './transportation/transportation.component';
import { ProgramComponent } from './program/program.component';

const informationRoutes: Routes = [
  {
    path: '',
    component: InformationComponent,
    data: { animation: 'InfoPages' },
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'location',
        component: LocationComponent,
        data: { animation: 'LocationPage' }
      },
      {
        path: 'stay',
        component: StayComponent,
        data: { animation: 'StayPage' }
      },
      {
        path: 'food',
        component: FoodComponent,
        data: { animation: 'FoodPage' }
      },
      {
        path: 'transportation',
        component: TransportationComponent,
        data: { animation: 'TransportPage' }
      },
      {
        path: 'program',
        component: ProgramComponent,
        data: { animation: 'ProgramPage' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(informationRoutes)],
  exports: [RouterModule]
})
export class InformationRoutingModule {}
