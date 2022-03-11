//ANGULAR//
import { Injectable } from '@angular/core';
//FIREBASE//
import { onAuthStateChanged } from 'firebase/auth';
import { deleteDoc, getDoc, query } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { collection, doc, Firestore, getDocs, getFirestore, setDoc } from '@angular/fire/firestore';
//NGRX//
import { Store } from '@ngrx/store';
import { CredentialsModels } from '../models/credentials.models';
import { getUserData } from '../auth/store/userState/user.actions';
import { UserState } from '../auth/store/userState/user.state';
//MODELOS//
import { UserModels } from '../models/user.models';
import { Notes, NotesModel } from '../models/notes.models';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(
    private auth : Auth,
    public db    : Firestore,
    private store: Store<UserState>
  ) {}

  //FUNCION PARA HACER EL LOGOUT FIREBASE//
  logout(){
    return this.auth.signOut();
  };

  //FUNCION PARA REALIZAR EL LOGIN FIREBASE//
  login( email:string, password: string ){
    return signInWithEmailAndPassword( this.auth, email, password );
  };

  //FUNCION PARA REALIZAR EL REGISTRO DE FIREBASE//
  register({ email, password }: CredentialsModels){
    return createUserWithEmailAndPassword( this.auth, email, password );
  };

  //FUNCION DE FIREBASE PARA SETEAR LOS USUARIOS//
  setUser( user: UserModels ){
    const newUser = doc( getFirestore(), 'users', user.id );
    return setDoc( newUser, { ...user }, { merge: true });
  };

  //FUNCION DE FIREBASE PARA TRAER LA DATA DE USUARIOS//
  async getUserData( id: string ): Promise<DocumentData> {
    const docSnap = await getDoc(doc(getFirestore(), "users", id));
    return docSnap.exists() ? docSnap.data() : null;
  };

  //FUNCION DE ESTADO DE SESION DE USUARIOS//
  statusSession(){
    const auth = getAuth();
  onAuthStateChanged( auth, ( user ) => {   
    if (user) this.store.dispatch( getUserData({ id: user.uid }))
     else {
      console.log('NO HAY USUARIO');
    }
  });
  };

  //FUNCION DE FIREBASE PARA SETEAR LOS DOCUMENTOS//
  setNotes( notes: NotesModel ){
    const newNotes = doc( getFirestore(), 'notes', notes.id );
    return setDoc( newNotes, { ...notes }, { merge: true });
  };

  //FUNCION PARA FILTAR LOS DOCUMENTOS DE FIREBASE//
  setMultipleNotes( notes: NotesModel[], id: string ){
    notes.forEach(( note ) => this.setNotes({...note, owner: id}));
  };

  //FUNCION DE FIREBASE PARA TRAER LOS DOCUMENTOS//
  async getAllNotes( ){
    const notesCollection = collection(getFirestore(), "notes");
    const q = query(notesCollection);
    let documents: NotesModel[] = [];
    const queryCollection = await getDocs(q);
     queryCollection.forEach( doc => {
        let  {
          title, text, id, dateCreate, dateFinish, folder, owner, favorite } = doc.data();
          documents.push(new Notes( title, text, id, dateCreate, dateFinish, folder, owner, favorite ));
      });
    return documents;
  };

  //FUNCION DE FIREBASE PARA ELIMINAR DOCUMENTOS//
  async deleteNote( note: NotesModel ){
    await deleteDoc( doc( getFirestore(), "notes", note.id ));
  };
};
