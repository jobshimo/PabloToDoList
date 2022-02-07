import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loading } from 'src/app/store/appState/app.actions';
import { AppState } from 'src/app/store/appState/app.state';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch( loading() )
  };


}
