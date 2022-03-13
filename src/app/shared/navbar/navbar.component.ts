import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/auth/store/userState/user.actions';
import { MainState } from '../../main.reducer';
import { searchFilterNote } from '../../store/noteState/notes.actions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  textToSearch: string  = '';
  open        : boolean = false;

  constructor( private store: Store<MainState> ) { }
  

  ngOnInit(): void {
  }

  //FUNCION PARA CAMBIAR EL NAVBAR AL CAMBIAR DE PAGINA//
  openClose(){
    this.open = !this.open;
  };

  //FUNCION CON NGRX PARA HACER EL LOGOUT//
  logout(){
    this.store.dispatch(logout());
  };

  //FUNCION PARA REALIZAR LA BUSQUEDA DE CADA NOTA
  search(){
    this.store.dispatch(searchFilterNote({ filter: this.textToSearch }));
  };
};
