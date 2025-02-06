import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../interfaces/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modelwindow',
  standalone: false,
  templateUrl: './modelwindow.component.html',
  styleUrls: ['./modelwindow.component.css'],
})
export class ModelwindowComponent {
  constructor(
    public dialogRef: MatDialogRef<ModelwindowComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      course: Course;
      enroll: Function;
      editCourse: Function;
      isEnrolled: any;
      isTutor: any;
    }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  enroll() {
    this.data.enroll(this.data.course.id!);
    this.data.isEnrolled = true;
  }

  editCourse() {
    this.data.editCourse(this.data.course.id!);
  }

  ReadMore(id:String){
    this.dialogRef.close();
       this.router.navigate(['/course', id]);

  }
}
