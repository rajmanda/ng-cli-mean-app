import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = "Welcome to Telangana Formation Day Celebrations - 2018 ";
  
  constructor() { }

  ngOnInit() {
  }

}
