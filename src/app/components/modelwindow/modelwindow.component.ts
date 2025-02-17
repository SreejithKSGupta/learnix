import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Course } from '../../interfaces/course';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Userservice } from '../../services/user.service';
import { OtherServices } from '../../services/otherservices.service';
import { User } from '../../interfaces/users';
import { selectUserState } from '../../store/selectors/user.selector';

@Component({
  selector: 'app-modelwindow',
  standalone:false,
  templateUrl: './modelwindow.component.html',
  styleUrls: ['./modelwindow.component.css'],
})
export class ModelwindowComponent {
  isAuthenticated = false;
  signedUser?: User;
  subscriptionStatuses: { [courseId: string]: boolean } = {};
  user$:any;
  constructor(
    public dialogRef: MatDialogRef<ModelwindowComponent>,
    private router: Router,
    private userservice: Userservice,
    private store: Store,
    private otherServices: OtherServices,
    @Inject(MAT_DIALOG_DATA) public course: Course
  ) {  this.user$ = this.store.select(selectUserState);
  }

  ngOnInit(): void {
    this.user$.subscribe((user: User | undefined) => {
      this.signedUser = user;
      this.isUserEnrolledToCourse(this.course.id);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  editCourse() {
    this.dialogRef.close();
    this.otherServices.showalert('confirm', 'Editing Blog?').subscribe((result) => {
      if (result === 'yes') {
        this.router.navigate(['/addcourse'], { queryParams: { id: this.course.id } });
      }
    });
  }

  isUserEnrolledToCourse(courseId: string): void {
    this.subscriptionStatuses[courseId] = this.signedUser?.courses?.some(course => course.id === courseId) ?? false;
  }

  enrollToCourse(): void {
    if (this.signedUser) {
      const courseData = {
        id: this.course.id,
        expiry: Date.now() + 60 * 24 * 60 * 60 * 1000,
        date: Date.now(),
        completion: 0,
      };
      this.userservice.enrollToCourse(this.signedUser.id, courseData).subscribe(() => {
        this.subscriptionStatuses[this.course.id] = true;
      });
    }
  }

  readMore(id: string): void {
    this.dialogRef.close();
    this.router.navigate(['/course', id]);
  }
}
