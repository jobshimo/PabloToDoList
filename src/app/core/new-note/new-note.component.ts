import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  open: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openClose(){
    this.open = !this.open;
  }

}
