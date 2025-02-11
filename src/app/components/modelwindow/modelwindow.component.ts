import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../interfaces/course';
import {  Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Userservice } from '../../services/user.service';
import { OtherServices } from '../../services/otherservices.service';
import { User } from '../../interfaces/users';
import { selectUserState } from '../../store/selectors/user.selector';

@Component({
  selector: 'app-modelwindow',
  standalone: false,
  templateUrl: './modelwindow.component.html',
  styleUrls: ['./modelwindow.component.css'],
})
export class ModelwindowComponent {
    isauthenticated: boolean = false;
    courses: Course[] = [];
    signeduser: User | undefined;
    subscriptionStatuses: { [courseId: string]: boolean } = {};
    user$: any;
  constructor(
    public dialogRef: MatDialogRef<ModelwindowComponent>,
    public router: Router,
        private userservice: Userservice,
        private store: Store,
        private otherServices: OtherServices,
    @Inject(MAT_DIALOG_DATA)
    public course: Course,

  ) {
    console.log(this.course);

  }

  ngOnInit(): void {
      this.user$ = this.store.select(selectUserState);

      this.user$.subscribe((user: User | undefined) => {
        if (user) {
          this.signeduser = user;
        }
      });
    }

  closeDialog(): void {
    this.dialogRef.close();
  }


  editCourse() {
    this.dialogRef.close();
    this.otherServices
    .showalert('confirm', 'Editing Blog?')
    .subscribe((result) => {
      if (result == 'yes') {
        console.log('editing course', this.course.id);
        this.router.navigate(['/addcourse'], { queryParams: { id: this.course.id } });
      }
    });
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

  enrollToCourse(): void {
    if (this.signeduser) {
      const coursedata = {
        id: this.course.id as string,
        expiry: Date.now() + 60 * 24 * 60 * 60 * 1000,
        date: Date.now(),
        completion: 0,
      };
      this.userservice
        .enrollToCourse(this.signeduser.id, coursedata)
        .subscribe(() => {
          if (this.course.id) {
            this.subscriptionStatuses[this.course.id] = true;
          }
        });
    }
  }

  ReadMore(id:String){
    this.dialogRef.close();
       this.router.navigate(['/course', id]);

  }
}
