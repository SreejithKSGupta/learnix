import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userservice } from '../../../services/user.service';
import { User } from '../login/user.interface';
import { Course } from '../../../interfaces/course';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  courses: Course[] = [];

  constructor(
    private router: Router,
    private userservice: Userservice,
    private dataservice: DataService
  ) {}

  ngOnInit(): void {
    if (this.userservice.isauthenticated()) {
      const userl = localStorage.getItem('user');

      if (userl) {
        const userId = JSON.parse(userl).id;

        this.userservice.getuserbyid(userId).subscribe({
          next: (userData) => {
            this.user = userData;
            let usercourses = this.user?.courses;
            if (usercourses) {
              for (let item of usercourses) {
                this.dataservice.getcoursebyid(item.id).subscribe(course => {
                  this.courses.push(course);
                });
              }

              console.log(this.courses)

            }
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
  removeCourse(courseId: string): void {
    console.log('Removing course:', courseId);
  }

  viewCourse(courseId: string): void {
    console.log('Viewing course:', courseId);
  }
  getUserCourseDetail(courseId: string, detail: string): any {
    const userCourse = this.user?.courses?.find((course: { id: string; }) => course.id === courseId);
    return userCourse ? userCourse[detail] : null;
  }
}
