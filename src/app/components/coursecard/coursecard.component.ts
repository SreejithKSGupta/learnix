import { Component ,Input} from '@angular/core';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-coursecard',
  standalone: false,

  templateUrl: './coursecard.component.html',
  styleUrl: './coursecard.component.css'
})


export class CourseCardComponent {
  @Input() course!: Course;
  @Input() getUserCourseDetail!: (courseId: string, detail: string) => any;
  @Input() removeCourse!: (courseId: string) => void;
  @Input() viewCourse!: (courseId: string) => void;
}
