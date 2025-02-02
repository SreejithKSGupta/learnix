import { OtherServices } from './../../../services/otherservices.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { Userservice } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { Course } from '../../../interfaces/course';
import { User } from '../../../interfaces/users';

import { managerUserChange } from '../../../store/actions/user.action';
import { selectUserState } from '../../../store/selectors/user.selector';
@Component({
  selector: 'app-studentdashboard',
  standalone: false,

  templateUrl: './studentdashboard.component.html',
  styleUrl: './studentdashboard.component.css'
})
export class StudentdashboardComponent {
  courses: Course[] = [];
  user$: Observable<User | null>;

  constructor(
    private router: Router,
    private userservice: Userservice,
    private dataservice: DataService,
    private store: Store,
    private otherServices: OtherServices
  ) {
    this.user$ = this.store.select(selectUserState);
  }

  ngOnInit(): void {
    this.user$.pipe(
      tap({
        next: (userData) => {
          this.loadUserCourses(userData!.courses);
        },
        error: (err) => console.error('Error fetching user data:', err),
      })
    ).subscribe();
  }
  private loadUserCourses(userCourses: { id: string }[] = []): void {
    userCourses.forEach((courseItem) => {
      this.dataservice.getcoursebyid(courseItem.id).subscribe((course) => {
        this.courses.push(course);
      });
    });
  }
}
