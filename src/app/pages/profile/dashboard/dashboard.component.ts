import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Userservice } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { Course } from '../../../interfaces/course';
import { User } from '../../../interfaces/users';

import { managerUserChange } from '../../../store/actions/user.action';
import { selectUserState } from '../../../store/selectors/user.selector';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user$: Observable<User | null>;
  courses: Course[] = [];

  constructor(
    private router: Router,
    private userservice: Userservice,
    private dataservice: DataService,
    private store: Store
  ) {
    this.user$ = this.store.select(selectUserState);
  }

  ngOnInit(): void {
    this.user$.pipe(
      tap({
        next: (userData) => {
          if (!userData?.name) {
            this.router.navigate(['/signin']);
            return;
          }
          if (userData.userType === 'admin') {
            this.router.navigate(['/adminipanel']);
            return;
          }

          // Only load courses when the user is valid
          this.loadUserCourses(userData.courses);
        },
        error: (err) => console.error('Error fetching user data:', err),
      })
    ).subscribe(); // Subscribe here to trigger the observable flow
  }gOnInit(): void {
    this.user$.pipe(
      tap({
        next: (userData) => {
          if (!userData?.name) {
            this.router.navigate(['/signin']);
            return;
          }
          if (userData.userType === 'admin') {
            this.router.navigate(['/adminipanel']);
            return;
          }

          // Only load courses when the user is valid
          this.loadUserCourses(userData.courses);
        },
        error: (err) => console.error('Error fetching user data:', err),
      }),
      take(1) // Ensures that you only process the next value once
    ).subscribe();
  }

  private loadUserCourses(userCourses: { id: string }[] = []): void {
    userCourses.forEach((courseItem) => {
      this.dataservice.getcoursebyid(courseItem.id).subscribe((course) => {
        this.courses.push(course);
      });
    });
  }

  logout(): void {
    this.userservice.signout();
    this.router.navigate(['/signin']);
  }

  goto(path: string): void {
    this.router.navigate([path]);
  }

  removeCourse(courseId: string): void {
    console.log('Removing course:', courseId);
  }

  viewCourse(courseId: string): void {
    console.log('Viewing course:', courseId);
  }
}
