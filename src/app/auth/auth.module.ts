//ANGULAR//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//COMPONENTS
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
//MODULOS//
import { AuthRoutingModule } from './auth-routing.module';
//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/userState/user.effects';
import { UserStateReducer } from '../auth/store/userState/user.reducer';





@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature('userState', UserStateReducer),
    EffectsModule.forFeature([ UserEffects ]),
  ]
})
export class AuthModule { }
