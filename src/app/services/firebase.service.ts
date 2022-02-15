import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, getFirestore, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { CredentialsModels } from '../models/credentials.models';
import { UserModels } from '../models/user.models';
import { getUserData } from '../auth/store/userState/user.actions';
import { UserState } from '../auth/store/userState/user.state';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth : Auth,
    public db    : Firestore,
    private store: Store<UserState>
  ) {}

  logout(){

    return this.auth.signOut();
  };

  login( email:string, password: string ){

    return signInWithEmailAndPassword( this.auth, email, password );
  };

  register({ email, password }: CredentialsModels){

    return createUserWithEmailAndPassword( this.auth, email, password );
  };

  setUser(user:UserModels){

    const newUser = doc( getFirestore(), 'users', user.id );
    return setDoc( newUser, { ...user }, { merge: true });
  };

  async getUserData( id: string ): Promise<DocumentData> {
    const docSnap = await getDoc(doc(getFirestore(), "users", id));
    return docSnap.exists() ? docSnap.data() : null;
  };

  statusSession(){
    const auth = getAuth();
  onAuthStateChanged( auth, ( user ) => {
    if (user) this.store.dispatch( getUserData({ id: user.uid }))
     else {
      console.log('NO HAY USUARIO');
    }
  });
  };
};
