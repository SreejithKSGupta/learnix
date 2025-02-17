import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Userservice } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { Course } from '../../../interfaces/course';
import { User } from '../../../interfaces/users';
import { selectUserState } from '../../../store/selectors/user.selector';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-studentdashboard',
  standalone:false,
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css'],
})
export class StudentdashboardComponent implements OnInit {
  courses: Course[] = [];
  errorcourses: string[] = [];
  user$: Observable<User | null>;
  private indexMap = new Map<number, number>();

  constructor(
    private userservice: Userservice,
    private dataservice: DataService,
    private store: Store
  ) {
    this.user$ = this.store.select(selectUserState);
  }

  ngOnInit(): void {
    this.user$
      .pipe(
        tap((user) => {
          if (user?.courses) {
            this.loadUserCourses(user.courses);
          }
        })
      )
      .subscribe();
  }

  private loadUserCourses(userCourses: { id: string }[]): void {
    userCourses.forEach(({ id }) => {
      this.dataservice.getcoursebyid(id).subscribe({
        next: (course) => this.courses.push(course),
        error: () => this.errorcourses.push(id),
      });
    });
  }

  remove404course(id: string) {
    this.errorcourses = this.errorcourses.filter((courseId) => courseId !== id);

    this.user$.pipe(tap((user) => {
      if (user) {
        this.userservice.removeFromCourse(user.id, id).subscribe();
      }
    })).subscribe();
  }

  trackByCourseId(index: number, course: any): number {
    const key = JSON.stringify(course) as unknown as number;
    if (this.indexMap.has(key)) {
      return this.indexMap.get(key)!;
    } else {
      this.indexMap.set(key, index);
      return index;
    }
  }
}
