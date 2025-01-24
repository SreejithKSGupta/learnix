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
    // Check if the user is authenticated
    if (this.userservice.isauthenticated()) {
      // Get the user data from localStorage
      const userl = localStorage.getItem('user');

      // Parse the user data safely
      if (userl) {
        this.user = JSON.parse(userl);

        // Log the first interest if exists, with a safety check
        if (this.user.areaOfInterest && this.user.areaOfInterest.length > 0) {
          console.log(this.user.areaOfInterest[0]);
        }
      }
    } else {
      // If not authenticated, redirect to sign-in page
      this.router.navigate(['/signin']);
    }
  }

  logout() {
    // Remove the user from localStorage and redirect to sign-in
    localStorage.removeItem('user');
    this.router.navigate(['/signin']);
  }

  goto(path: string) {
    // Navigate to the specified path
    this.router.navigate([path]);
  }
}
