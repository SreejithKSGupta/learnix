import { Component ,Input} from '@angular/core';
import { Course } from '../../interfaces/course';
import { Userservice } from '../../services/user.service';
@Component({
  selector: 'app-coursecard',
  standalone: false,

  templateUrl: './coursecard.component.html',
  styleUrl: './coursecard.component.css'
})


export class CourseCardComponent {
  @Input() course!: Course;
  @Input() user!: any;

  constructor(private userservice:Userservice){}


  getUserCourseDetail(courseId: string, detail: string): any {
    const userCourse = this.user?.courses?.find((course: { id: string; }) => course.id === courseId);
    return userCourse ? userCourse[detail] : null;
  }

  removeCourse(courseID:String){
    this.userservice.removeFromCourse(this.user.id,courseID).subscribe(res=>{
      alert("succesfully removed from course");
      // dynamically remove the course from the user's course list
      this.user.courses = this.user.courses.filter((course: { id: string; }) => course.id !== courseID);
      window.location.reload();
    })
    }

  viewCourse(){
    console.log("view");

  }

  isclassover(courseId: string): boolean {
    const userCourse = this.user?.courses?.find((course: { id: string; }) => course.id === courseId);
   // check if usercourse.expiry is over

   return userCourse.expiry<new Date();
  return true
  }
}
