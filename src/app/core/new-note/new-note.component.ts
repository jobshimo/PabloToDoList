import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appState/app.state';
import { loadingstop } from '../../store/appState/app.actions';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  open: boolean = false;

  constructor( private store:Store<AppState>) { }

  ngOnInit(){
    this.store.dispatch( loadingstop() )
  };

  openClose(){
    this.open = !this.open;
  }

}
