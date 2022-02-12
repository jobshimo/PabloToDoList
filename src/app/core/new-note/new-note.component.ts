import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appState/app.state';
import { loadingstop } from '../../store/appState/app.actions';
import {  NotesModel, Notes } from '../../models/notes.models';
import { addNoteTemp, addTittleTemp } from '../../store/noteState/notes.actions';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  open : boolean = false;

  text : string = '';
  title: string = '';


  constructor( private store: Store<AppState>) {

    this.store.dispatch( loadingstop() )
  }

  ngOnInit(){
  };

  openClose(){
    this.open = !this.open;
  }

  saveTempNote(){

    let newNote: NotesModel = new Notes(this.title,this.text, new Date().getMilliseconds().toString(), new Date(), '', []);
    // localStorage.setItem('title',this.title,);
    // localStorage.setItem('text',this.text, );
    // localStorage.setItem('note',JSON.stringify(newNote) );
    this.store.dispatch(addNoteTemp({note: newNote}))
    console.log(newNote)
  };

  saveTempTitle(){

    this.store.dispatch(addTittleTemp({title: this.title}));
    console.log(this.title)
  };
};
