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
    if (this.userservice.isauthenticated()) {
      const userl = localStorage.getItem('user');

      if (userl) {
        const userId = JSON.parse(userl).id;

        this.userservice.getuserbyid(userId).subscribe({
          next: (userData) => {
            this.user = userData;
          },
          error: (err) => {
            console.error('Error fetching user data:', err);
          }
        });
      }
    } else {
      this.router.navigate(['/signin']);
    }
  }

  logout() {
    this.userservice.signout();
    this.router.navigate(['/signin']);
  }

  goto(path: string) {
    this.router.navigate([path]);
  }
}
