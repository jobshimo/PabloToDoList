import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { collection, doc, Firestore, getDocs, getFirestore, query, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { CredentialsModels } from '../models/credentials.models';
import { UserModels } from '../models/user.models';
import { getUserData } from '../auth/store/userState/user.actions';
import { UserState } from '../auth/store/userState/user.state';
import { NotesModel, Notes } from '../models/notes.models';

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

  setUser( user: UserModels ){

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

  setNotes( notes: NotesModel ){

    const newNotes = doc( getFirestore(), 'notes', notes.id );
    return setDoc( newNotes, { ...notes }, { merge: true });
  };

  async getAllnotes( ){
    const notesCollection = collection(getFirestore(), "notes");
    const q = query(notesCollection);
    let documents: NotesModel[] = [];
    const queryCollection = await getDocs(q);
     queryCollection.forEach( doc => {
        let  {
          title, text, id, dateCreate, dateFinish, folder } = doc.data();
       documents.push(new Notes(title, text, id, dateCreate, dateFinish, folder));
      });
    return documents;
    };
};
