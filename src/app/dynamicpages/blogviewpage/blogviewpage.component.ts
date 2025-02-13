import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Comment } from '../../interfaces/comment';


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
    this.blogService.getBlogById(blogId as unknown as number).subscribe((data:any) => {
      this.blogData = data;
    })

  }

  onAddComment(newComment: Comment) {
    console.log('New Comment:', newComment);
    console.log(this.blogData);


    this.blogData.comments.push(newComment);
    this.blogService.addcomment(this.blogData,newComment).subscribe((data:any) => {
      console.log(data);
    })

  }

}


