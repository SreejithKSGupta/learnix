import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../interfaces/course';
import { Router } from '@angular/router';
import { Userservice } from '../../services/user.service';
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
  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router,
    private userservice: Userservice
  ) {}
  ngOnInit(): void {
    this.dataService.getcourses().subscribe((res: Course[]) => {
      this.courses = res;
    });
    this.isauthenticated = this.userservice.isauthenticated();
    if (this.isauthenticated) {
      this.userrole = this.userservice.userrole();
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

  enrolltocourse(item: any) {
    console.log('enrolling to course', item);
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
}
