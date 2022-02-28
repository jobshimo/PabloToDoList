//ANGULAR//
import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Router } from '@angular/router';
//NGRX//
import { Store } from '@ngrx/store';
import { addNoteTemp, getAllNotes } from '../../store/noteState/notes.actions';
import { loading } from 'src/app/store/appState/app.actions';
import { selectUser } from 'src/app/auth/store/userState/user.selectors';
import { MainState } from '../../main.reducer';
import { selectNotes } from '../../store/noteState/notes.selectors';
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
  private users$   : Observable<UserModels> = this.store.select(selectUser)
  private usersSubs: Subscription;

  private notes$   : Observable<NotesModel[]> = this.store.select(selectNotes);
  private notesSubs: Subscription;
  public allNotes  : NotesModel[] = [];


  constructor( private store: Store<MainState>, private router: Router ) {
    this.store.dispatch( loading() );
   };

  ngOnInit() {
    this.usersSubs = this.users$.subscribe( user => {
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
    })
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
  };
};
