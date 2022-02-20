import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageNotes } from 'src/app/models/storageNotes.model';
import { loading } from 'src/app/store/appState/app.actions';
import { NotesModel } from '../../models/notes.models';
import { addNoteTemp, getAllNotes, setAllNotesData } from '../../store/noteState/notes.actions';
import {  Router } from '@angular/router';
import { Observable, Subscription, takeUntil } from 'rxjs';
import { UserModels } from 'src/app/models/user.models';
import { selectUser } from 'src/app/auth/store/userState/user.selectors';
import { MainState } from '../../main.reducer';
import { selectNotes } from '../../store/noteState/notes.selectors';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public allNotes  : NotesModel[] = [];
  private users$   : Observable<UserModels> = this.store.select(selectUser)
  private usersSubs: Subscription;

  private notes$   : Observable<NotesModel[]> = this.store.select(selectNotes);
  private notesSubs: Subscription;

 



  constructor( private store: Store<MainState>, private router: Router ) {

    this.store.dispatch( loading() )
   }


  ngOnInit() {

    this.usersSubs = this.users$.subscribe( user =>{
      if (!user)   this.getNote();
      else{
        this.notesSubs = this.notes$.subscribe( notes => this.allNotes = notes);
        this.store.dispatch(getAllNotes());
        this.ngOnDestroy();
      }
    });
  };

  getNote(){
    let notes = localStorage.getItem('note');
    let objectNote: StorageNotes = JSON.parse(notes ? notes : '{}');
    this.allNotes = objectNote.notes;
  };

  editNote(note:NotesModel){

    this.store.dispatch(addNoteTemp({ note }));

    this.router.navigate(['/newNote']);
  }

  ngOnDestroy(): void {
    this.usersSubs.unsubscribe();
    // this.notesSubs.unsubscribe();
  };
}