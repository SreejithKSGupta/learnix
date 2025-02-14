import { Blog } from './../../../interfaces/blog';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Userservice } from '../../../services/user.service';
import { User } from '../../../interfaces/users';
import { Store } from '@ngrx/store';
import { selectUserState } from '../../../store/selectors/user.selector';
import { OtherServices } from '../../../services/otherservices.service';
import { ModelwindowComponent } from '../../../components/modelwindow/modelwindow.component';

@Component({
  selector: 'app-blogposts',
  standalone: false,
  templateUrl: './blogposts.component.html',
  styleUrl: './blogposts.component.css'
})
export class BlogpostsComponent implements OnInit {
  isauthenticated: boolean = false;
  userrole: string = '';
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  signeduser: User | undefined;
  subscriptionStatuses: { [BlogId: string]: boolean } = {};
  user$: any;

  searchQuery: string = '';
  selectedFilter: string = '';
  filterValue: number | string = '';

  constructor(
    private blogservice: BlogService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userservice: Userservice,
    private store: Store,
    private otherServices: OtherServices
  ) {}

  ngOnInit(): void {

    this.user$ = this.store.select(selectUserState);

    this.user$.subscribe((user: User | undefined) => {
      if (user) {
        this.signeduser = user;
        this.fetchBlogs();
      }
    });


  }

  fetchBlogs(): void {
    this.blogservice.getBlogs().subscribe((Blogs) => {
      this.blogs = Blogs.slice(0,3);
      console.log(this.blogs);

    });
  }
}
