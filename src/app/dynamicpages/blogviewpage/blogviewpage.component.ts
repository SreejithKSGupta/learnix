import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Comment } from '../../interfaces/comment';
import { Title,Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-blogviewpage',
  standalone: false,
  templateUrl: './blogviewpage.component.html',
  styleUrl: './blogviewpage.component.css'
})
export class BlogviewpageComponent {
  constructor(private router:Router, private blogService:BlogService,private titleService: Title,private metaService: Meta ){}
  blogData:any;

  ngOnInit(){
    const url = this.router.url.split('/')
    const blogId = url[url.length - 1]
    this.blogService.getBlogById(blogId as unknown as number).subscribe({
      next:(data:any) => {
      this.blogData = data;
    },
    error:(err) => {
      this.router.navigate(['/404'], { queryParams: { errorCode: 423 } });

    }
    })

    this.titleService.setTitle(this.blogData?.courseName!);
    this.metaService.updateTag({ name: 'description', content: this.blogData?.description! });
    this.metaService.updateTag({ name: 'keywords', content:` ${this.blogData?.author},${this.blogData?.topic}`});


  }

  onAddComment(newComment: Comment) {
    this.blogData.comments.push(newComment);
    this.blogService.addcomment(this.blogData,newComment).subscribe((data:any) => {
      console.log(data);

    })

  }

}


