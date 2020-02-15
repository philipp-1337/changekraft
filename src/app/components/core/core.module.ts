import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from 'src/app/services/auth.service';
import { CoreComponent } from './core.component';
import { UserService } from 'src/app/services/user.service';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { RouterOutlet } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [CommonModule, AppRoutingModule, SharedModule, MaterialModule],
  declarations: [
    CoreComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EventDetailComponent,
    NotFoundComponent
  ],
  exports: [HeaderComponent, AppRoutingModule],
  providers: [AuthService, UserService]
})
export class CoreModule { }
