import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { CoreModule } from './components/core/core.module';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { UpdateService } from './services/update.service';
import { SnackbarClass } from './shared/snackbar.class';
import { RouterModule } from '@angular/router';


@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [CoreModule,
        MaterialModule,
        MaterialFileInputModule,
        BrowserModule,
        RouterModule,
        SharedModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        BrowserAnimationsModule,
        LayoutModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })], providers: [
        { provide: LOCALE_ID, useValue: 'de' },
        AngularFireAuthGuard,
        UpdateService,
        SnackbarClass,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
}
