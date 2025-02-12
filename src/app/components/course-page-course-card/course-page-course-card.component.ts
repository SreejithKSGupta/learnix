import { Component, Input } from '@angular/core';
import { Course } from '../../interfaces/course';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserState } from '../../store/selectors/user.selector';
import { ModelwindowComponent } from '../../components/modelwindow/modelwindow.component';

@Component({
  selector: 'app-course-page-course-card',
  standalone: false,
  templateUrl: './course-page-course-card.component.html',
  styleUrls: ['./course-page-course-card.component.css'],
})
export class CoursePageCourseCardComponent {
  courses: Course[] = [];
  user$: any;

  @Input() course!: Course;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ){}

  ngOnInit(): void {
    this.checkForCourseId();

    this.user$ = this.store.select(selectUserState);

    if (this.user$.userrole) {
      let role = this.user$.userrole;
      if (role !== 'tutor' && role !== 'student' && role !== 'admin') {
        this.router.navigate(['/n404'], { queryParams: { errorCode: '21' } });
      }
    }
  }

  openCourseDetails(course: Course): void {
    this.dialog.open(ModelwindowComponent, {
      data:course,
      width: '900px',
      maxWidth: '800px',
    });
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

}
