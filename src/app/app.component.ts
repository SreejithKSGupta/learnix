import { Component, OnInit } from '@angular/core';
import { Userservice } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'e-Learn';
  constructor(private userservice:Userservice){  }
  ngOnInit(): void {
    this.userservice.checkauthentication();
  }

}
