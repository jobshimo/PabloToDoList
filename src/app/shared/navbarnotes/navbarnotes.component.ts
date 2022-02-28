//ANGULAR//
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//NGRX//
import { Store } from '@ngrx/store';
import { selectTempNote } from '../../store/noteState/notes.selectors';
import { deleteNote, deleteNoteTemp } from 'src/app/store/noteState/notes.actions';
import { selectUser } from 'src/app/auth/store/userState/user.selectors';
import { setAllNotesData } from '../../store/noteState/notes.actions';
import { MainState } from 'src/app/main.reducer';
//MODELOS//
import { NotesModel } from '../../models/notes.models';
import { StorageNotes } from 'src/app/models/storageNotes.model';
import { UserModels } from 'src/app/models/user.models';
//RXJS//
import { Observable, Subscription } from 'rxjs';
//SWEETALERT2//
import Swal from 'sweetalert2';
//FIREBASE//
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-navbarnotes',
  templateUrl: './navbarnotes.component.html',
  styleUrls: ['./navbarnotes.component.scss']
})

export class NavbarnotesComponent implements OnInit, OnDestroy {

  private notes$    : Observable<NotesModel | null> = this.store.select( selectTempNote );
  private notesSubs : Subscription;
  public notes      : NotesModel | null;
  public title      : string       = '';
  public text       : string       = '';

  private users$    : Observable<UserModels> = this.store.select( selectUser )
  private usersSubs : Subscription;
  private user      : UserModels;


  constructor( private store          : Store<MainState>, 
               private firebaseService: FirebaseService,
               private router         : Router ) { }

  ngOnInit(): void {
    this.usersSubs = this.users$.subscribe( user => this.user = user );
    this.notesSubs = this.notes$.subscribe( notes => this.notes = notes );
  };

  //FUNCION NOTA EDITADA//
  editNote(){
    Swal.fire({
      title             : 'Estas Seguro?',
      text              : "Los cambios efectuados no se guardaran!",
      icon              : 'warning',
      showCancelButton  : true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : 'Salir'
    }).then(( result ) => {

      if ( result.isConfirmed ) {
        this.store.dispatch( deleteNoteTemp() )
        this.router.navigate( ['/home'] );
      } else if ( result.isDenied ) {
        Swal.fire( 'Changes are not saved', '', 'info');
      }
    });
  };

  //FUNCION PARA GUARDAR NOTA EN EL LOCALSTORAGE O EN FIREBEASE//
  saveNote(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cambios guardados',
      showConfirmButton: false,
      timer: 2000
    })
    if ( this.user )  this.saveNoteFirebase();
    else this.saveNoteLocalStorage();
  };

  //FUNCION PARA GUARDAR LA NOTA EN EL LOCAL//
  saveNoteLocalStorage(){
    if ( !this.notes ) return;
    let notes = localStorage.getItem( 'note' );

    if( notes ){
      let notesObject: StorageNotes =  JSON.parse(notes);
      let check      : boolean      = false;
        notesObject.notes.forEach( ( note, index ) => {
          if ( note.id === this.notes.id ) {
            notesObject.notes.splice( index, 1, this.notes )
            check = true;
          };
        })

       if( !check ) {
        notesObject.notes.push( this.notes ? this.notes : {} as NotesModel );
      }
      localStorage.setItem( 'note', JSON.stringify( notesObject ) );
      this.store.dispatch( deleteNoteTemp() );
      this.router.navigate( ['/home'] );
    } 
    else {     
      let newNotesStorage = new StorageNotes();
      newNotesStorage.notes.push( this.notes ? this.notes : {} as NotesModel )
      localStorage.setItem( 'note', JSON.stringify( newNotesStorage ) )
      this.store.dispatch( deleteNoteTemp() );
      this.router.navigate( ['/home'] );
    }
  };

  //FUNCION PARA GUARDAR LA NOTA EN FIREBASE CON NGRX//
  saveNoteFirebase(){
    this.store.dispatch(setAllNotesData({ note: this.notes }));  
  };

  //FUNCION PARA ELIMINAR LA NOTA DEL LOCAL O DE FIREBASE
  deleteNote(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Nota borrada',
      showConfirmButton: false,
      timer: 2000
    })
    if ( this.user )  this.deleteNoteFirebase( this.notes );
    else this.deleteNoteLocalStorage();
  };
  
  //FUNCION PARA BORRAR NOTA EN EL LOCAL//
  deleteNoteLocalStorage(){  
    let notes = localStorage.getItem( 'note' );
    let notesObject: StorageNotes =  JSON.parse( notes );
    notesObject.notes.forEach( ( note, index ) => {

      if ( note.id === this.notes.id ) {
        notesObject.notes.splice( index, 1 )
      };
    })
    localStorage.setItem( 'note', JSON.stringify( notesObject ) );
    this.router.navigate( ['/home'] );

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Nota Borrada',
      showConfirmButton: false,
      timer: 2000
    })
  };

  //FUNCION PARA ELIMINAR LA NOTA DE FIREBASE
  deleteNoteFirebase(note: NotesModel){
    this.store.dispatch( deleteNote( { note }));
    this.router.navigate( ['/home'] );
  };

  ngOnDestroy(): void {
    this.notesSubs?.unsubscribe();
    this.usersSubs?.unsubscribe();
  };
};
