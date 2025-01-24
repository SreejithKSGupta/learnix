import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userservice } from '../../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private router: Router, private userservice: Userservice) {}

  ngOnInit(): void {
    console.log(this.userservice.isauthenticated());
    if (this.userservice.isauthenticated()) {
      const userl = localStorage.getItem('user') || 'null';
      this.user = JSON.parse(userl);
    }
    else {
      this.router.navigate(['/signin']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/signin']);
  }

  goto(path: string) {
    this.router.navigate([path]);
  }
}
