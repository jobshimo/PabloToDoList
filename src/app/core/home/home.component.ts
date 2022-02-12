import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageNotes } from 'src/app/models/storageNotes.model';
import { loading } from 'src/app/store/appState/app.actions';
import { AppState } from 'src/app/store/appState/app.state';
import { NotesModel } from '../../models/notes.models';
import { addNoteTemp } from '../../store/noteState/notes.actions';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public allNotes : NotesModel[] = [];


  constructor( private store: Store<AppState>, private router: Router) {

    this.store.dispatch( loading() )
   }

  ngOnInit() {
    this.getNote();
  };


  getNote(){

    let notes = localStorage.getItem('note');
    console.log(notes);
    let objectNote: StorageNotes = JSON.parse(notes ? notes : '');
    console.log(objectNote);

    this.allNotes = objectNote.notes;

  };

  editNote(note:NotesModel){

    this.store.dispatch(addNoteTemp( {note}));

    this.router.navigate(['/newNote']);
  }
}
