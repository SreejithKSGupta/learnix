import { Course } from './../../interfaces/course';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'app-courseviewpage',
  standalone: false,
  templateUrl: './courseviewpage.component.html',
  styleUrl: './courseviewpage.component.css',
})
export class CourseviewpageComponent {

  course$!: Observable<Course>|null;
  course! : Course | undefined;

  removeCourse(arg0: any) {
    throw new Error('Method not implemented.');
  }
  isclassover(arg0: any) {
    return 1;
  }


  constructor(private router: Router, private data: DataService) {}
  ngOnInit(): void {
    this.course$=this.data.getcoursebyid(this.router.url.split('/')[2])
    this.course$.subscribe((data:any) => {
      this.course = data;
    })
  }

  onAddComment(newComment:any) {
    console.log('New Comment:', newComment);


    this.course!.comments!.push(newComment);
    this.data.addcomment(this.course!,newComment).subscribe((data:any) => {
    })

  }




}
