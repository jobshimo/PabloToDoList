import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, map, switchMap, take } from "rxjs/operators";
import { FirebaseService } from '../../services/firebase.service';
import { getAllNotes, getAllNotesSuccess, getAllNotesError, setAllNotesData, setAllNotesDataSuccess, setAllNotesDataError } from './notes.actions';


@Injectable()

export class NotesEffects {

    constructor( private actions$       : Actions, 
                 private firebaseService: FirebaseService ){};





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

     setNoteData$ = createEffect(()=>
     this.actions$.pipe(
      ofType(setAllNotesData),
      switchMap( ({ note }) =>  from(this.firebaseService.setNotes( note )).pipe(
       take(1),
       map( () => setAllNotesDataSuccess() ),
        catchError(error => of(setAllNotesDataError({ error })))
      ),
    ),
  ),
 );
};