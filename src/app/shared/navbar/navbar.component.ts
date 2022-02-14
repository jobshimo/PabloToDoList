import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  open: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openClose(){
    this.open = !this.open;
  };

}
