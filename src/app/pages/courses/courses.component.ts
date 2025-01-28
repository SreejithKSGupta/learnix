import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../interfaces/course';
import { Router, ActivatedRoute } from '@angular/router';
import { Userservice } from '../../services/user.service';
import { User } from '../profile/login/user.interface';
import { Subscriber } from 'rxjs';
import { UserCourses } from '../../interfaces/users';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  isauthenticated: boolean = false;
  userrole: string = '';
  courses: Course[] = [];
  signeduser: User | undefined;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userservice: Userservice
  ) {}

  ngOnInit(): void {
    let userid = JSON.parse(localStorage.getItem('user') || '{}').id;
    if (userid) {
      this.userservice.getuserbyid(userid).subscribe((res) => {
        this.signeduser = res;
        console.log(this.signeduser);
      });
    }
    this.dataService.getcourses().subscribe((res: Course[]) => {
      this.courses = res;
      this.checkForCourseId();
    });

    this.isauthenticated = this.userservice.isauthenticated();
    if (this.isauthenticated) {
      this.userrole = this.userservice.userrole();
      console.log(this.userrole);
      if (
        this.userrole !== 'tutor' &&
        this.userrole !== 'student' &&
        this.userrole !== 'admin'
      ) {
        this.router.navigate(['/n404'], { queryParams: { errorCode: '21' } });
      }
    }
  }

  removecourseitem(item: any) {
    console.log('removing course', item);
    this.dataService.removecourse(item).subscribe((res) => {
      console.log('Course removed', res);
    });
    window.location.reload();
  }

  editcourseitem(item: any) {
    console.log('editing course', item);
    this.closecoursedetails();
    this.router.navigate(['/addcourse'], { queryParams: { id: item } });
  }

  enrolltocourse(id: String) {
    console.log('enrolling to course', id);
    let userid = JSON.parse(localStorage.getItem('user') || '{}').id;
    if (userid) {
      let coursedata = {
        id: id,
        expiry: Date.now() + 60 * 24 * 60 * 60 * 1000,
        date: Date.now(),
        completion: 0,
      };
      this.userservice.enrollToCourse(userid, coursedata).subscribe((res) => {
        console.log('res');
      });
    }
  }

  openCourseDetails(course: Course, templateRef: any): void {
    this.dialog.open(templateRef, {
        data: course,
        width: '400px',
    });
}

  closecoursedetails() {
    this.dialog.closeAll();
  }

  isUserEnrolledToCourse(courseId: string): boolean {
    if (!this.signeduser || !this.signeduser.courses) {
      return false;
    }
    return this.signeduser.courses.some((course: any) => course.id === courseId);
  }

  checkForCourseId(): void {
    this.route.queryParams.subscribe(params => {
      const courseId = params['courseId'];
      if (courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
          this.openCourseDetails(course,'#detailsTemplate');
        }
      }
    });
  }
}
