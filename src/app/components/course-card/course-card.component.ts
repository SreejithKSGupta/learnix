import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone:false,
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponentnew {
  @Input() course: any;
  @Output() courseSelected = new EventEmitter<any>();
  flipped = false;

  toggleFlip() {
    this.flipped = !this.flipped;
  }
  openCourseDetails() {
    this.courseSelected.emit(this.course);
  }
}
