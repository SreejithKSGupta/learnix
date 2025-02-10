import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';


@Component({
  selector: 'app-blogviewpage',
  standalone: false,

  templateUrl: './blogviewpage.component.html',
  styleUrl: './blogviewpage.component.css'
})
export class BlogviewpageComponent {
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: object,private router:Router, private blogService:BlogService ){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
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


