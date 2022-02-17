import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, map, switchMap, take } from "rxjs/operators";
import { FirebaseService } from '../../services/firebase.service';
import { getAllNotes, getAllNotesSuccess, getAllNotesError } from './notes.actions';


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
};