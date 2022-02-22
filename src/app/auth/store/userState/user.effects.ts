import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, from, map, of, switchMap, take } from "rxjs";
import { StorageNotes } from "src/app/models/storageNotes.model";
import { User } from "../../../models/user.models";
import { FirebaseService } from "../../../services/firebase.service";
import { login, getUserData, loginError, getUserDataSucces, getUserDataError, logout, logoutSuccess, logoutError, setUserData, setUserDataSuccess, setUserDataError, register, registerError, registerRemoveNotesLocal } from './user.actions';
import { UserState } from './user.state';


@Injectable()

export class UserEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<UserState>,
    private firebaseService: FirebaseService,

  ) {}

  userLogin$ = createEffect( () =>
    this.actions$.pipe(
      ofType( login ),
      switchMap( ({ credentials }) =>  from( this.firebaseService.login( credentials.email, credentials.password )).pipe(
        take( 1 ),
        map(
          ({ user }) => {
            this.router.navigate([ '/home' ]);
            return getUserData({ id:user.uid });
          }),
        catchError( error => of(loginError({ error }))),
    )),
    ),
);

    getUserData$ = createEffect( () =>
    this.actions$.pipe(
      ofType( getUserData ),
      switchMap( ({ id }) =>  from( this.firebaseService.getUserData( id )).pipe(
       take( 1 ),
       map( ({ id, email, regDate, name }) => getUserDataSucces({user: new User( id, email, regDate, name )}) ),
        catchError( error => of(getUserDataError({ error }))),
      ),
     ),
    ),
 );

    userLogout$ = createEffect(()=>
      this.actions$.pipe(
        ofType( logout ),
        switchMap(()=> from( this.firebaseService.logout() ).pipe(
          take( 1 ),
          map( () => {
            this.router.navigate([ '/login' ]);
            return logoutSuccess() }),
          catchError( error => of(logoutError({ error })))
        )),
      ),
    );

    setUserData$ = createEffect(()=>
    this.actions$.pipe(
      ofType( setUserData ),
     switchMap( ({ user }) =>  from(this.firebaseService.setUser( user )).pipe(
      take(1),
      map( () => setUserDataSuccess({ id: user.id }) ),
      catchError( error => of( setUserDataError({ error })))
      ),),
    ),
 );

 userRegister$ = createEffect(()=>
   this.actions$.pipe(
     ofType(register),
     switchMap( ({ credentials }) =>  from(this.firebaseService.register({ email: credentials.email, password: credentials.password })).pipe(
       take(1),
       map( ({ user }) => setUserData({user: new User( user.uid, user.email, '', '')}) ),
       catchError( error => of( registerError({ error })))
        ),
      ),
   ),
  );

  userRegisterRemoveLocalNotes$ = createEffect( () =>
  this.actions$.pipe(
    ofType( setUserDataSuccess ),
    map( ({ id }) =>{
      
      let notes                    = localStorage.getItem( 'note' );
      let objectNote: StorageNotes = JSON.parse( notes ? notes : '{}' );
    
      if ( notes ) {
        this.firebaseService.setMultipleNotes( objectNote.notes, id );
        localStorage.removeItem( 'note' );
      }
      return registerRemoveNotesLocal();
    })
  ))
};