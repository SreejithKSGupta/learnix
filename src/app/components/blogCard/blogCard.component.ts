import { router } from './../../app-routing.module';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { OtherServices } from '../../services/otherservices.service';

@Component({
    selector: 'app-blogCard',
    standalone:false,
    templateUrl: './blogCard.component.html',
    styleUrls: ['./blogCard.component.css']
})
export class BlogCardComponent {
    @Input() blog:any;
    constructor (
      private router : Router,
      private otherservices: OtherServices
    ) {


    }


  onReadMore(id: any) {
    this.router.navigate(['/blog', id]);
  }

  onShare(id: any) {
    const blogLink = `${window.location.origin}/blog/${id}`;
    navigator.clipboard.writeText(blogLink).then(() => {
      this.otherservices.showalert('info', 'Blog link copied to clipboard!');
    });
  }
}


