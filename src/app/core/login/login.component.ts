import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/store/userState/user.state';
import { FirebaseService } from '../../services/firebase.service';

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

    this.firebaseService.login( this.email, this.password );
    console.log(this.email, this.password);
  };

}
