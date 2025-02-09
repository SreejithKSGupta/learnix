import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
import { Course } from '../../interfaces/course';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Userservice } from '../../services/user.service';
import { User } from '../../interfaces/users';
import { Store } from '@ngrx/store';
import { selectUserState } from '../../store/selectors/user.selector';
import { OtherServices } from '../../services/otherservices.service';
import { ModelwindowComponent } from '../../components/modelwindow/modelwindow.component';

@Component({
  selector: 'app-course-page-course-card',
  standalone: false,
  templateUrl: './course-page-course-card.component.html',
  styleUrls: ['./course-page-course-card.component.css'],
})
export class CoursePageCourseCardComponent {
  isauthenticated: boolean = false;
  courses: Course[] = [];
  signeduser: User | undefined;
  subscriptionStatuses: { [courseId: string]: boolean } = {};
  user$: any;
  userrole: string = '';

  @Input() course!: Course;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userservice: Userservice,
    private store: Store,
    private otherServices: OtherServices
  ){}

  ngOnInit(): void {
    this.user$ = this.store.select(selectUserState);

    this.user$.subscribe((user: User | undefined) => {
      if (user) {
        this.signeduser = user;
        this.checkForCourseId();
      }
    });

    if (this.user$.userrole) {
      let role = this.user$.userrole;
      if (role !== 'tutor' && role !== 'student' && role !== 'admin') {
        this.router.navigate(['/n404'], { queryParams: { errorCode: '21' } });
      }
    }
  }

  openCourseDetails(course: Course): void {
    this.dialog.open(ModelwindowComponent, {
      data: {
        course,
        isEnrolled: this.subscriptionStatuses[course.id!],
        isTutor: this.userrole === 'tutor',
        enroll: this.enrollToCourse.bind(this),
        editCourse: this.editcourseitem.bind(this),
      },
      width: '900px',
      maxWidth: '800px',
        panelClass: 'dark-themed-dialog'
    });
  }

  enrollToCourse(id: string): void {
    if (this.signeduser) {
      const coursedata = {
        id: id,
        expiry: Date.now() + 60 * 24 * 60 * 60 * 1000,
        date: Date.now(),
        completion: 0,
      };
      this.userservice
        .enrollToCourse(this.signeduser.id, coursedata)
        .subscribe(() => {
          this.subscriptionStatuses[id] = true;
        });
    }
  }

  isUserEnrolledToCourse(courseId: string): void {
    if (!this.signeduser || !this.signeduser.courses) {
      this.subscriptionStatuses[courseId] = false;
      return;
    }
    this.subscriptionStatuses[courseId] = this.signeduser.courses.some(
      (course: any) => course.id === courseId
    );
  }

  checkForCourseId(): void {
    this.route.queryParams.subscribe((params) => {
      const courseId = params['cid'];
      if (courseId) {
        const course = this.courses.find((c) => c.id === courseId);
        if (course) {
          this.openCourseDetails(course);
        }
      }
    });
  }

  editcourseitem(item: any): void {
    this.otherServices
      .showalert('confirm', 'Editing Blog?')
      .subscribe((result) => {
        if (result == 'yes') {
          console.log('editing course', item);
          this.router.navigate(['/addcourse'], { queryParams: { id: item } });
        }
      });
  }
}
