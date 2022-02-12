import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NoteState } from 'src/app/store/noteState/notes.state';
import { Notes, NotesModel } from '../../models/notes.models';
import {  selectTempNote } from '../../store/noteState/notes.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbarnotes',
  templateUrl: './navbarnotes.component.html',
  styleUrls: ['./navbarnotes.component.scss']
})
export class NavbarnotesComponent implements OnInit {

  private notes$    : Observable<NotesModel[] | any> = this.store.select(selectTempNote);
  private notesSubs!: Subscription;
  public notes      : NotesModel[] = [];
  public title      : string       = '';
  public text       : string       = ''


  constructor( private store: Store<NoteState>) { }

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
      confirmButtonText: 'Borrar'
    })
  }

  ngOnDestroy(): void {
    this.notesSubs.unsubscribe();
  };
};
