import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserState } from 'src/app/store/userState/user.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public email   :string = '';
  public password: string = ''

  constructor( private firebaseService: FirebaseService, 
    private            store          : Store<UserState>) { }

  ngOnInit(): void {
  }

  register( email: string, password: string){
    
    this.firebaseService.register({ email, password } );
  };

}
