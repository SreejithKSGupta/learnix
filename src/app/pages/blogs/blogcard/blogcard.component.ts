import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BlogService, Blog } from '../../../services/blog.service';
@Component({
  selector: 'app-blogcard',
  standalone: false,

  templateUrl: './blogcard.component.html',
  styleUrl: './blogcard.component.css'
})
export class BlogcardComponent {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = data;
    });
  }

  deleteBlog(id: number) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(id).subscribe(() => {
        this.loadBlogs();
      });
    }
  }
}
