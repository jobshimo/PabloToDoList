import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, map, switchMap, take } from "rxjs/operators";
import { FirebaseService } from '../../services/firebase.service';
import { getAllNotes, getAllNotesSuccess, getAllNotesError, setAllNotesData, setAllNotesDataSuccess, setAllNotesDataError, goHome, deleteNote, deleteNoteSuccess, deleteNoteError } from './notes.actions';
import { Router } from '@angular/router';


@Injectable()

export class NotesEffects {

    constructor( private actions$       : Actions, 
                 private firebaseService: FirebaseService,
                 private router         : Router ){};

    getNotes$ = createEffect( () =>
    this.actions$.pipe(
      ofType( getAllNotes ),
      switchMap( () =>  from( this.firebaseService.getAllNotes()).pipe(
       take( 1 ),
       map( notes  => getAllNotesSuccess({ notes }) ),
        catchError( error => of( getAllNotesError({ error }))),
      ),
     ),
    ),
 );

     setNoteData$ = createEffect( () =>
     this.actions$.pipe(
      ofType( setAllNotesData ),
      switchMap( ({ note }) =>  from(this.firebaseService.setNotes( note )).pipe(
       take(1),
       map( () => setAllNotesDataSuccess() ),
        catchError(error => of( setAllNotesDataError({ error })))
      ),
    ),
  ),
 );

     goHome$ = createEffect( () =>
     this.actions$.pipe(
      ofType( setAllNotesDataSuccess, setAllNotesDataError ),
      map(() => { 
       this.router.navigate(['/home']);
       return goHome()
      }
     ),
    ),
  );

  deleteNote$ = createEffect( () =>
     this.actions$.pipe(
      ofType( deleteNote ),
      switchMap( ({ note }) =>  from( this.firebaseService.deleteNote( note )).pipe(
       take(1),
       map( () => deleteNoteSuccess() ),
        catchError(error => of( deleteNoteError({ error })))
      ),
    ),
  ),
 );
};

  