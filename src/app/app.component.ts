import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/appState/app.state';
import { selectApp } from './store/appState/app.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TodoList';

  public loading$: Observable<boolean> = this.store.select(selectApp);
  
  constructor( private store: Store<AppState>){}

  ngOnInit() {
  }
};

