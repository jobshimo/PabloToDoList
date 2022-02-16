import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appState/app.state';
import { loadingstop } from '../../store/appState/app.actions';
import { NotesModel, Notes } from '../../models/notes.models';
import { addNoteTemp, addTittleTemp } from '../../store/noteState/notes.actions';
import { Observable, Subscription } from 'rxjs';
import { selectTempNote } from 'src/app/store/noteState/notes.selectors';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  open : boolean = false;
  new  : boolean = true;
  text  : string = '';
  title : string = '';
  id    : string | null = null;

  private notes$     : Observable<NotesModel | null> = this.store.select(selectTempNote);
  private nostesSubs!: Subscription;


  constructor( private store: Store<AppState>) {

    this.store.dispatch( loadingstop() )
  }

  ngOnInit(){
    this.nostesSubs = this.notes$.subscribe(note => {
      if (note) {
        this.new = false;
        this.text  = note.text;
        this.title = note.title
        this.id    = note.id
      }
    })
  };

  openClose(){
    this.open = !this.open;
  }

  saveTempNote(){
    let newNote: NotesModel = new Notes(this.title,this.text, this.id ? this.id : new Date().getTime().toString() , new Date(), '', []);
    this.store.dispatch(addNoteTemp({note: newNote}))
  };

  // saveTempTitle(){

  //   this.store.dispatch(addTittleTemp({title: this.title}));
  //   console.log(this.title)
  // };
};
