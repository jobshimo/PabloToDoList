import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Credentials } from 'src/app/models/credentials.models';
import { login } from 'src/app/auth/store/userState/user.actions';
import { FirebaseService } from '../../services/firebase.service';
import { MainState } from '../../main.reducer';
import { UserState } from '../store/userState/user.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';

  constructor( private firebaseService: FirebaseService, 
               private store          : Store<UserState>) { }

  ngOnInit(): void {
  }

  login(){

    // this.firebaseService.login( this.email, this.password );
    this.store.dispatch(login( { credentials: new Credentials( this.email, this.password )}))
    console.log(this.email, this.password);
  };
};
