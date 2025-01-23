import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userl = localStorage.getItem('user') || 'null';
    this.user = JSON.parse(userl);
    if (this.user === null) {
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
