import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NewNoteComponent } from './core/new-note/new-note.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';

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
    path      : 'login',
    component : LoginComponent
  },
  {
    path      : 'register',
    component : RegisterComponent
  },
  {
    path      : '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
