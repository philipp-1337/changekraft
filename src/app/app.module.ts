import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';

import { MyNavComponent } from './components/my-nav/my-nav.component';

import { AuthGuard } from './services/auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { HomeComponent } from './pages/home/home.component';
import { SuccessComponent } from './pages/rsvp/success/success.component';
import { CancellationComponent } from './pages/rsvp/cancellation/cancellation.component';

import { DateAdapter } from '@angular/material/core';
import { GermanWeek } from './shared/germanWeek.class';

import { AuthService } from './services/auth.service';

import { AdminModule } from './components/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    RsvpComponent,
    HomeComponent,
    SuccessComponent,
    CancellationComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    SharedModule,
    AdminModule,
    AngularFireModule.initializeApp(AppComponent),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: DateAdapter, useClass: GermanWeek }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
}
