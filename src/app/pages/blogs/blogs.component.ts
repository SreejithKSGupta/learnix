import { Component, OnInit } from '@angular/core';
import { BlogService, Blog } from '../../services/blog.service';
@Component({
  selector: 'app-blogs',
  standalone: false,

  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = data.slice(0, 5);
    });
  }
}
