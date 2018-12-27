import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { CoreComponent } from './core.component';
import { AuthTestComponent } from './auth-test/auth-test.component';

@NgModule({
  imports: [CommonModule, AppRoutingModule, SharedModule, MaterialModule],
  declarations: [
    CoreComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AuthTestComponent
  ],
  exports: [HeaderComponent, AppRoutingModule],
  providers: [AuthGuard, AuthService]
})
export class CoreModule {}
