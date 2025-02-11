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
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Input() user!: any;

  courseDetails: any = {}; // Cache the course details

  constructor(private userservice: Userservice, private router: Router,private dataservice : DataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.cacheCourseDetails();
    }
  }

  // Cache the course details for the current course
  cacheCourseDetails() {
    if (this.user?.courses && this.course?.id) {
      const userCourse = this.user.courses.find((course: { id: string }) => course.id === this.course.id);
      if (userCourse) {
        this.courseDetails = {
          date: userCourse.date,
          expiry: userCourse.expiry,
          completion: userCourse.completion,
        };
      }
    }
  }

  getUserCourseDetail(detail: string): any {
    return this.courseDetails[detail] || null;
  }

  removeCourse(courseID: string) {
    console.log('removecourse');
    this.userservice.removeFromCourse(this.user.id, courseID).subscribe((res) => {
      alert('Successfully removed from course');
      // Dynamically remove the course from the user's course list
      this.user.courses = this.user.courses.filter((course: { id: string }) => course.id !== courseID);
      window.location.reload();
    });
  }

  gotocourse(id: String) {
    console.log('gotocourse');
    this.router.navigate(['/course', id]);
  }

  isclassover(courseId: string): boolean {
    const userCourse = this.user?.courses?.find((course: { id: string }) => course.id === courseId);
    return userCourse ? userCourse.expiry < new Date() : true;
  }

  deleteCourse(courseId: string) {
    this.dataservice.removecourse(courseId).subscribe((res: any) => {
      alert('Successfully deleted course');
      window.location.reload();
    });
  }
}
