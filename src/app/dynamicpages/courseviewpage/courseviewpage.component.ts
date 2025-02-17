import { Course } from './../../interfaces/course';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Title,Meta } from '@angular/platform-browser';

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


  constructor(private router: Router, private data: DataService,private titleService: Title,private metaService: Meta) {}
  ngOnInit(): void {


    this.course$=this.data.getcoursebyid(this.router.url.split('/')[2])
    this.course$.subscribe({
      next: (data: any) => {
        this.course = data;
        this.titleService.setTitle(data.courseName);
      },
      error: (error: any) => {
        this.router.navigate(['/404'], { queryParams: { errorCode: 413 } });
      }
    });

    this.titleService.setTitle(this.course?.courseName!);
    this.metaService.updateTag({ name: 'description', content: this.course?.description! });
    this.metaService.updateTag({ name: 'keywords', content:` ${this.course?.tutor!},${this.course?.importantTechnologiesUsed}`});

  }

  onAddComment(newComment:any) {


    this.course!.comments!.push(newComment);
    this.data.addcomment(this.course!,newComment).subscribe((data:any) => {
    })

  }




}
