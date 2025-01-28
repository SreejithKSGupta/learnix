import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../interfaces/course';
import { Router, ActivatedRoute } from '@angular/router';
import { Userservice } from '../../services/user.service';
import { Users } from '../../interfaces/users';
import { forkJoin } from 'rxjs';
import { ModelwindowComponent } from '../../components/modelwindow/modelwindow.component';

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
  signeduser: Users | undefined;
  subscriptionStatuses: { [courseId: string]: boolean } = {};

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
      forkJoin({
        user: this.userservice.getuserbyid(userid),
        courses: this.dataService.getcourses()
      }).subscribe(({ user, courses }) => {
        this.signeduser = user;
        this.courses = courses;
        this.courses.forEach(course => {
          this.isUserEnrolledToCourse(course.id!);
        });
        this.checkForCourseId();
      });
    }

    this.isauthenticated = this.userservice.isauthenticated();
    if (this.isauthenticated) {
      this.userrole = this.userservice.userrole();
      if (
        this.userrole !== 'tutor' &&
        this.userrole !== 'student' &&
        this.userrole !== 'admin'
      ) {
        this.router.navigate(['/n404'], { queryParams: { errorCode: '21' } });
      }
    }
  }

  openCourseDetails(course: Course): void {
    this.dialog.open(ModelwindowComponent, {
      data: { course,
        isEnrolled: this.subscriptionStatuses[course.id!],
        isTutor: this.userrole === 'tutor',
        enroll: this.enrollToCourse.bind(this),
        editCourse: this.editcourseitem.bind(this), },
      width: '400px',
    });
  }

  enrollToCourse(id: string) {
    console.log('enrolling to course', id);
    let userid = JSON.parse(localStorage.getItem('user') || '{}').id;
    if (userid) {
      let coursedata = {
        id: id,
        expiry: Date.now() + 60 * 24 * 60 * 60 * 1000,
        date: Date.now(),
        completion: 0,
      };
      this.userservice.enrollToCourse(userid, coursedata).subscribe(() => {
        this.subscriptionStatuses[id] = true;
      });
    }
  }

  isUserEnrolledToCourse(courseId: string): void {
    if (!this.signeduser || !this.signeduser.courses) {
      this.subscriptionStatuses[courseId] = false;
      return;
    }
    this.subscriptionStatuses[courseId] = this.signeduser.courses.some((course: any) => course.id === courseId);
  }

  checkForCourseId(): void {
    this.route.queryParams.subscribe(params => {
      const courseId = params['cid'];
      if (courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
          this.openCourseDetails(course);
        }
      }
    });
  }
  editcourseitem(item: any) {
    console.log('editing course', item);
    // this.closecoursedetails();
    this.router.navigate(['/addcourse'], { queryParams: { id: item } });
  }
}
