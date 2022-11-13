import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducers';
import { AuthService } from './services/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './store/auth.effect';

import { LocalstorageService } from 'src/app/shared/services/localstorage/localstorage.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    HttpClientModule,
    EffectsModule.forFeature([AuthEffect]),

  ],
  providers: [AuthService, LocalstorageService],
})
export class AuthModule {}
