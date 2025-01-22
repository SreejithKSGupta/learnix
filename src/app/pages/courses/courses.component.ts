import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import {Course} from '../../interfaces/course';
@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
removecourseitem(item:any) {
   console.log("removing course", item);
    this.dataService.removecourse(item).subscribe((res) => {
      console.log("Course removed", res);
    });
}
  courses: Course[] = [];

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataService.getcourses().subscribe((res: Course[]) => {
      this.courses = res;
    });
  }

  // Open dialog for course details
  openCourseDetails(course: Course, templateRef: any): void {
    this.dialog.open(templateRef, {
      data: course,
      width: '400px',
    });
  }
}
