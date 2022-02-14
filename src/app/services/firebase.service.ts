import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { CredentialsModels } from '../models/credentials.models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth : Auth,
    public db    : Firestore,
  ) {}

  logout(){

    return this.auth.signOut();
  };

  login( email:string, password: string ){

    return signInWithEmailAndPassword( this.auth, email, password );
  };

  register({ email, password}: CredentialsModels){

    return createUserWithEmailAndPassword( this.auth, email, password );
  };
};
