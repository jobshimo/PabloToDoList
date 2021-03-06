//ANGULAR//
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//NGRX//
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appState/app.state';
import { loadingstop } from '../../store/appState/app.actions';
import { addNoteTemp, deleteNoteTemp, setAllNotesData } from '../../store/noteState/notes.actions';
import { selectTempNote } from 'src/app/store/noteState/notes.selectors';
import { selectUser } from 'src/app/auth/store/userState/user.selectors';
//MODELOS//
import { NotesModel, Notes } from '../../models/notes.models';
import { UserModels } from 'src/app/models/user.models';
import { StorageNotes } from 'src/app/models/storageNotes.model';
//RXJS//
import { Observable, Subscription } from 'rxjs';
//SWEETALERT2//
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit, OnDestroy {

  open        : boolean       = false;
  select      : boolean       = false;
  new         : boolean       = true;
  text        : string        = '';
  title       : string        = '';
  id          : string | null = null;
  owner       : string | null = null;
  favorite    : boolean       = false;

  public notes       : NotesModel | null;
  private notes$     : Observable<NotesModel | null> = this.store.select( selectTempNote );
  private nostesSubs : Subscription;

  private users$     : Observable<UserModels> = this.store.select( selectUser );
  private usersSubs  : Subscription;
  private user       : UserModels;

  constructor( private store: Store<AppState>, private router: Router ) {
    this.store.dispatch( loadingstop() );
  };
  
  ngOnInit(){
    this.usersSubs = this.users$.subscribe( user => this.user = user);
    this.nostesSubs = this.notes$.subscribe(note => {
      if (note) {
        this.new      = false;
        this.text     = note.text;
        this.title    = note.title;
        this.id       = note.id;
        this.owner    = this.user ? this.user.id : '';
        this.favorite = note.favorite;
        this.select   = note.favorite;
      };
    });
  };

  //FUNCION PARA CAMBIAR EL NAVBAR//
  openClose(){
    this.open = !this.open;
  };

  //FUNCION PARA GUARDAR LA NOTA TEMPORAL//
  saveTempNote(){
    let newNote: NotesModel = new Notes(this.title,this.text, this.id ? this.id : new Date().getTime().toString(), new Date(), '', [], this.owner, this.favorite );
    this.store.dispatch(addNoteTemp({ note: newNote }));
  };

  //FUNCION PARA A??ADIRLA COMO FAVORITA//
  addNoteFav(){
    this.favorite = !this.favorite;
   
    Swal.fire({
      title             : `??Quieres ${this.favorite? 'a??adir' : 'quitar'} esta nota ${this.favorite? 'a' : 'de'} Favoritos?`,
      icon              : 'question',
      showCancelButton  : true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : `S??, ${this.favorite? 'a??adir!' : 'quitar!'}` ,
    }).then(( result ) => {
      if ( result.isConfirmed ) {
        switch ( true ) {
          case !this.user:
            this.addNoteFavLocalStorage();  
            break;
        
          case !!this.user:
            this.addNoteFavFirebase();
            break;
        };
      } else if ( result.isDenied ) {
        Swal.fire( 'Changes are not saved', '', 'info' );
      };
    }); 
  };

  //FUNCION PARA A??ADIR NOTA COMO FAVORITA EN FIREBASE//
  addNoteFavFirebase(){
    let newNote: NotesModel = new Notes( this.title,this.text, this.id ? this.id : new Date().getTime().toString(), new Date(), '', [], this.owner, this.favorite );
    this.store.dispatch(setAllNotesData({ note:newNote }));
    this.store.dispatch( deleteNoteTemp() );  
  };

 //FUNCION PARA A??ADIRLA COMO FAVORITA EN EL LOCAL STORAGE//
  addNoteFavLocalStorage(){
    let notes = localStorage.getItem( 'note' );
    let notesObject: StorageNotes =  JSON.parse( notes );
    notesObject.notes.forEach( ( note ) => {
      if ( note.favorite === false ) {
        note.favorite = true;
        note.favorite = this.favorite;
      } else if ( note.favorite === true ){
        note.favorite = false;
        note.favorite != this.favorite;
      }
    });
    localStorage.setItem( 'note', JSON.stringify( notesObject ) );
    this.router.navigate( ['/home'] );
    this.store.dispatch( deleteNoteTemp() );
  };

  ngOnDestroy(): void {
    this.usersSubs?.unsubscribe();
    this.nostesSubs?.unsubscribe();
  };
};


