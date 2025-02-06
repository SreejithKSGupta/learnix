import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-courseviewpage',
  standalone: false,

  templateUrl: './courseviewpage.component.html',
  styleUrl: './courseviewpage.component.css',
})
export class CourseviewpageComponent {
  removeCourse(arg0: any) {
    throw new Error('Method not implemented.');
  }
  isclassover(arg0: any) {
    return 1;
  }


  constructor(private router: Router, private data: DataService) {}
  course$!: Observable<Course>|null;
  ngOnInit(): void {
    this.course$=this.data.getcoursebyid(this.router.url.split('/')[2])
  }
}
