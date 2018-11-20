import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SecondPageComponent } from './pages/second-page/second-page.component';
// import { FirstPageComponent } from './pages/first-page/first-page.component';
import { AnmeldungComponent } from './pages/anmeldung/anmeldung.component';
import { ZusagenComponent } from './pages/zusagen/zusagen.component';

const routes: Routes = [
  // { path: 'first-page', component: FirstPageComponent },
  // { path: 'second-page', component: SecondPageComponent },
  { path: 'anmeldung', component: AnmeldungComponent },
  { path: 'zusagen', component: ZusagenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
