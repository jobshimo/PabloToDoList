//ANGULAR//
import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Router } from '@angular/router';
//NGRX//
import { Store } from '@ngrx/store';
import { addNoteTemp, getAllNotes } from '../../store/noteState/notes.actions';
import { loading } from 'src/app/store/appState/app.actions';
import { selectUser } from 'src/app/auth/store/userState/user.selectors';
import { MainState } from '../../main.reducer';
import { selectNotes, selectSearch } from '../../store/noteState/notes.selectors';
//MODELOS//
import { StorageNotes } from 'src/app/models/storageNotes.model';
import { NotesModel } from '../../models/notes.models';
import { UserModels } from 'src/app/models/user.models';
//RXJS//
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  public user      : UserModels;
  private users$   : Observable<UserModels> = this.store.select( selectUser )
  private usersSubs: Subscription;

  private notes$   : Observable<NotesModel[]> = this.store.select( selectNotes );
  private notesSubs: Subscription;
  public allNotes  : NotesModel[] = [];

  public search$   : Observable<string> = this.store.select( selectSearch );
  public searchSubs: Subscription;
  public search    : string = '';
  
  
  constructor( private store: Store<MainState>, private router: Router ) {
    this.store.dispatch( loading() );
   };

  ngOnInit() {
    this.searchSubs = this.search$.subscribe( search => this.search = search);
    this.usersSubs  = this.users$.subscribe( user => {
      switch ( true ) {
        case !user:
          this.getNote();
          break;
        case !!user:
          this.notesSubs  = this.notes$.subscribe( notes => {
          this.allNotes   = this.filterNotes( notes, user.id );
          });
          this.store.dispatch( getAllNotes() );
          break;
      }
    });  
};

  //FUNCION PARA FILTRAR POR PALABRAS LAS NOTAS//
  filterSearch(notes:NotesModel[]): NotesModel[]{
     return notes.filter( note => {
      switch (true) {
        case (this.search === null):
          return true;
        case (note.text.toUpperCase().includes( this.search.toUpperCase() )):
          return true;
        case (note.title.toUpperCase().includes( this.search.toUpperCase() )):
          return true;
        default:
          return false;
      };
    });
  };

  //FUNCION PARA FILTAR LAS NOTAS//
  filterNotes( notes: NotesModel[], id: string ): NotesModel[] {
    let noteFilter: NotesModel[] = [];

    notes.forEach(( note ) => {
      if (note.owner === id) {
        noteFilter.push( note );
      };
    });
      return noteFilter;
  };

  //FUNCION PARA OBTENER LAS NOTAS DEL LOCAL//
  getNote(){
    let notes = localStorage.getItem( 'note' );
    let objectNote: StorageNotes = JSON.parse(notes ? notes : '{}');
    this.allNotes = objectNote.notes;
  };

  //FUNCION PARA EDITAR UNA NOTA//
  editNote( note: NotesModel ){
    this.store.dispatch(addNoteTemp({ note }));
    this.router.navigate(['/newNote']);
  };

  ngOnDestroy(): void {
    this.usersSubs?.unsubscribe();
    this.notesSubs?.unsubscribe();
    this.searchSubs?.unsubscribe();
  };
};
