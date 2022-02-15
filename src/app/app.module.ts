//ANGULAR//
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
//COMPONENTS
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './core/home/home.component';
import { NewNoteComponent } from './core/new-note/new-note.component';
import { NavbarnotesComponent } from './shared/navbarnotes/navbarnotes.component';
//MODULO DE RUTAS//
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
//NGRX//
import { MAIN_REDUCER } from './main.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
//Firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AppEffects } from './store/appState/app.effects';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NewNoteComponent,
    NavbarnotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    AngularSvgIconModule.forRoot(),
    StoreModule.forRoot(MAIN_REDUCER),
    EffectsModule.forRoot([ AppEffects ]),
    StoreDevtoolsModule.instrument({
      maxAge: 100, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
