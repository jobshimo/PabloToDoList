import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/auth/store/userState/user.actions';
import { UserState } from 'src/app/auth/store/userState/user.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  open: boolean = false;

  constructor(private store: Store<UserState>) { }

  ngOnInit(): void {
  }

  openClose(){
    this.open = !this.open;
  };

  logout(){
    this.store.dispatch(logout());
  };

};
