import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';

interface Course {
  courseName: string;
  tutor: string;
  duration: string;
  description: string;
  importantTechnologiesUsed: string[];
  courseFee: string;
}

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = []; // Initialized courses array

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Fetch courses from the service
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
