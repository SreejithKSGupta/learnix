import { DataService } from './../../services/data.service';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../interfaces/course';
import { Userservice } from '../../services/user.service';

@Component({
  selector: 'app-coursecard',
  standalone: false,
  templateUrl: './coursecard.component.html',
  styleUrls: ['./coursecard.component.css'],
})
export class CourseCardComponent{
  @Input() course!: Course;
  @Input() user!: any;

  courseDetails: any = {}; // Cache the course details

  constructor(private userservice: Userservice, private router: Router,private dataservice : DataService) {}



  getUserCourseDetail(detail: string): any {
    return this.courseDetails[detail] || null;
  }

  removeCourse(courseID: string) {
    this.userservice.removeFromCourse(this.user.id, courseID).subscribe();
    window.location.reload();

  }

  gotocourse(id: String) {
    this.router.navigate(['/course', id]);
  }

  isclassover(courseId: string): boolean {
    const userCourse = this.user?.courses?.find((course: { id: string }) => course.id === courseId);
    return userCourse ? userCourse.expiry < new Date() : true;
  }

  deleteCourse(courseId: string) {
    this.dataservice.removecourse(courseId).subscribe((res: any) => {
      window.location.reload();
    });
  }
}
