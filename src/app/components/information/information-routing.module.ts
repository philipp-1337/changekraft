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
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'location',
        component: LocationComponent,
      },
      {
        path: 'stay',
        component: StayComponent,
      },
      {
        path: 'food',
        component: FoodComponent,
      },
      {
        path: 'transportation',
        component: TransportationComponent,
      },
      {
        path: 'program',
        component: ProgramComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(informationRoutes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
