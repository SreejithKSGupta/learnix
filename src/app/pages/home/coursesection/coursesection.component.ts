import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../../interfaces/course';
import { Router, ActivatedRoute } from '@angular/router';
import { Userservice } from '../../../services/user.service';
import { User } from '../../../interfaces/users';
import { Store } from '@ngrx/store';
import { selectUserState } from '../../../store/selectors/user.selector';
import { OtherServices } from '../../../services/otherservices.service';
import { ModelwindowComponent } from '../../../components/modelwindow/modelwindow.component';

@Component({
  selector: 'app-coursesection',
  standalone: false,
  templateUrl: './coursesection.component.html',
  styleUrls: ['./coursesection.component.css'],
})
export class CoursesectionComponent implements OnInit {
  isauthenticated: boolean = false;
  userrole: string = '';
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  signeduser: User | undefined;
  subscriptionStatuses: { [courseId: string]: boolean } = {};
  user$: any;

  searchQuery: string = '';
  selectedFilter: string = '';
  filterValue: number | string = '';

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userservice: Userservice,
    private store: Store,
    private otherServices: OtherServices
  ) {}

  ngOnInit(): void {
    console.log("reaching here");

    this.user$ = this.store.select(selectUserState);
    console.log("reaching here");

    this.user$.subscribe((user: User | undefined) => {
      if (user) {
        this.signeduser = user;
        this.fetchCourses();
        this.checkForCourseId();
      }
    });


  }

  fetchCourses(): void {
    this.dataService.getcourses().subscribe((courses) => {
      console.log(courses);

      this.courses = courses.sort((a: { subscribers: number; }, b: { subscribers: number; }) => b.subscribers - a.subscribers).slice(0, 4);
      this.filteredCourses = [...this.courses];
      this.courses.forEach((course) => {
        this.isUserEnrolledToCourse(course.id!);
      });
    });
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
      width: '400px',
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
