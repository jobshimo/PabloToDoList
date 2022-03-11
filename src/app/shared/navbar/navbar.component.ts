import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/auth/store/userState/user.actions';
import { MainState } from '../../main.reducer';
import { NotesModel } from '../../models/notes.models';
import { Observable } from 'rxjs';
import { selectSearch } from '../../store/noteState/notes.selectors';
import { searchFilterNote } from '../../store/noteState/notes.actions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  textToSearch: string = '';

  open      : boolean = false;
  // search$   : Observable<string> = this.store.select(selectSearch);

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


  search(){
    this.store.dispatch(searchFilterNote({filter: this.textToSearch}))
  }

//   filterSearch(notes:NotesModel[]): NotesModel[]{
//     return notes.filter( note => {  
//       if (note.text.toUpperCase().includes( this.search.toUpperCase() ))  return true
//       else if (note.title.toUpperCase().includes( this.search.toUpperCase() )) return true
//       else return false;
//    })
//  };
};
