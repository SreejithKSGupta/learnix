import { Comment } from './../../../interfaces/comment';
import { OtherServices } from './../../../services/otherservices.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { Userservice } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { Course } from '../../../interfaces/course';
import { User } from '../../../interfaces/users';
import { MatDialog } from '@angular/material/dialog';
import { managerUserChange } from '../../../store/actions/user.action';
import { selectUserState } from '../../../store/selectors/user.selector';
import { MessagereplyComponent } from '../../../components/messagereply/messagereply.component';
@Component({
  selector: 'app-studentdashboard',
  standalone: false,

  templateUrl: './studentdashboard.component.html',
  styleUrl: './studentdashboard.component.css',
})
export class StudentdashboardComponent {
  courses: Course[] = [];
  user$: Observable<User | null>;
  errorcourses: any = [];
  user!: User;

  constructor(
    private router: Router,
    private userservice: Userservice,
    private dataservice: DataService,
    private store: Store,
    private otherServices: OtherServices,
    public dialog: MatDialog,

  ) {
    this.user$ = this.store.select(selectUserState);
  }

  ngOnInit(): void {
    this.user$
      .pipe(
        tap({
          next: (userData) => {
            this.user = userData!;
            console.log(this.user.messages);

            this.loadUserCourses(userData!.courses);
          },
          error: (err) => console.error('Error fetching user data:', err),
        })
      )
      .subscribe();
  }
  private loadUserCourses(userCourses: { id: string }[] = []): void {
    userCourses.forEach((courseItem) => {
      this.dataservice.getcoursebyid(courseItem.id).subscribe({
        next: (course) => {
          this.courses.push(course);
        },
        error: () => {
          this.errorcourses.push(courseItem.id);
        },
      });
    });
  }

  remove404course(id: String) {
    this.errorcourses = this.errorcourses.filter(
      (courseId: string) => courseId !== id
    );
    let userid = '';
    this.user$.subscribe((user) => {
      if (user) {
        userid = user.id;
      }
    });

    this.userservice.removeFromCourse(userid, id).subscribe();
  }


}
