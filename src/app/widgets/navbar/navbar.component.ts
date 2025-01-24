import { Component,OnInit } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import { Userservice } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  logordash: string | undefined;

  constructor(private userservice: Userservice) {}

  ngOnInit() {
    this.logordash = this.userservice.isauthenticated() ? 'Dashboard' : 'Login';
  }

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
}
