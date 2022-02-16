import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NewNoteComponent } from './core/new-note/new-note.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [


  {
    path      : 'home',
    component : HomeComponent,
  },
  {
    path      : 'newNote',
    component : NewNoteComponent
  },
  {
    path      : 'auth',
   loadChildren: ()=> import ('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path      : '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
