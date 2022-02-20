import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NoteState } from 'src/app/store/noteState/notes.state';
import { Notes, NotesModel } from '../../models/notes.models';
import {  selectTempNote } from '../../store/noteState/notes.selectors';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StorageNotes } from 'src/app/models/storageNotes.model';
import { deleteNoteTemp } from 'src/app/store/noteState/notes.actions';
import { UserModels } from 'src/app/models/user.models';
import { selectUser } from 'src/app/auth/store/userState/user.selectors';
import { MainState } from 'src/app/main.reducer';
import { setAllNotesData } from '../../store/noteState/notes.actions';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-navbarnotes',
  templateUrl: './navbarnotes.component.html',
  styleUrls: ['./navbarnotes.component.scss']
})
export class NavbarnotesComponent implements OnInit, OnDestroy {

  private notes$    : Observable<NotesModel | null> = this.store.select(selectTempNote);
  private notesSubs!: Subscription;
  public notes!     : NotesModel | null;
  public title      : string       = '';
  public text       : string       = '';

  private users$    : Observable<UserModels> = this.store.select(selectUser)
  private usersSubs : Subscription;



  constructor( private store          : Store<MainState>, 
               private router         : Router,
               private firebaseService: FirebaseService ) { }

  ngOnInit(): void {

    this.notesSubs = this.notes$.subscribe( notes => this.notes = notes);
  };

    deleteNote(){

    Swal.fire({
      title: 'Estas Seguro?',
      text: "Tu nota creada se borrara!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Salir'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success');
        this.store.dispatch(deleteNoteTemp())
        this.router.navigate(['/home']);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  
  saveNoteLocalStorage(){
    console.log(this.notes);

    if (!this.notes) return;
    let notes = localStorage.getItem('note');

    if(notes){
      let notesObject: StorageNotes =  JSON.parse(notes);
      console.log(notesObject);

      let check: boolean = false;

        notesObject.notes.forEach( (note, index) => {
          if (note.id === this.notes.id) {
            notesObject.notes.splice(index, 1, this.notes)
            check = true;
          }
        })
       if(!check) {
        notesObject.notes.push(this.notes ? this.notes : {} as NotesModel);
      }
      localStorage.setItem('note', JSON.stringify(notesObject));
      this.store.dispatch(deleteNoteTemp());
      this.router.navigate(['/home']);
    } else {
      let newNotesStorage = new StorageNotes();
      newNotesStorage.notes.push( this.notes ? this.notes : {} as NotesModel)
      localStorage.setItem('note', JSON.stringify(newNotesStorage))
      this.store.dispatch(deleteNoteTemp());
      this.router.navigate(['/home']);
    }
  };

  saveNoteFirebase(){

      
  };


  ngOnDestroy(): void {
    this.notesSubs.unsubscribe();
  };
};
