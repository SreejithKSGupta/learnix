import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';


@Component({
  selector: 'app-blogviewpage',
  standalone: false,

  templateUrl: './blogviewpage.component.html',
  styleUrl: './blogviewpage.component.css'
})
export class BlogviewpageComponent {
  constructor(private router:Router, private blogService:BlogService ){}
  blogData:any;

  ngOnInit(){
    const url = this.router.url.split('/')
    const blogId = url[url.length - 1]
    console.log(blogId);
    this.blogService.getBlogById(blogId as unknown as number).subscribe((data:any) => {
      console.log(data);
      this.blogData = data;
    })

  }

}


