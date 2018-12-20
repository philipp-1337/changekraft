import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';

import { AuthService } from './services/auth.service';

import { AuthGuard } from './services/auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MyNavComponent } from './components/my-nav/my-nav.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { DateAdapter } from '@angular/material/core';
import { GermanWeek } from './shared/germanWeek.class';


@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    SharedModule,
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
