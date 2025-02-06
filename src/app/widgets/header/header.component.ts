import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../interfaces/users';
import { selectUserState } from '../../store/selectors/user.selector';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'Learnix';
  logo = '/learnixtplogo.webp';
  logordash: string = 'Login';
  user$: Observable<User | null>;
  userSubscription!: Subscription;
  @ViewChild('drawer') drawer!: MatDrawer;
  navLinks = [
    { path: '/home', label: 'Home', tooltip: 'Go to Home' },
    {
      path: '/courses',
      label: 'Courses',
      tooltip: 'Explore Courses',
      submenu: [
        { path: '/courses/advanced', label: 'Advanced Courses', tooltip: 'Explore Advanced Courses' },
        { path: '/courses/beginner', label: 'Beginner Courses', tooltip: 'Explore Beginner Courses' },
        { path: '/courses/professional', label: 'Professional Courses', tooltip: 'Explore Professional Courses' },
      ],
    },
    {
      path: '/blogs',
      label: 'Blogs',
      tooltip: 'Read Blogs',
      submenu: [
        { path: '/blogs/tutorials', label: 'Tutorials', tooltip: 'Read Tutorials' },
        { path: '/blogs/updates', label: 'Updates', tooltip: 'Read Updates' },
        { path: '/blogs/interviews', label: 'Interviews', tooltip: 'Read Interviews' },
      ],
    },
    { path: '/faq', label: 'FAQ', tooltip: 'FAQs' },
    { path: '/about', label: 'About', tooltip: 'About Us' },
    { path: '/privacy', label: 'Privacy', tooltip: 'Privacy Policy' },
    { path: '/contact', label: 'Contact', tooltip: 'Contact Us' },
    { path: '/addcourse', label: 'Add Course', tooltip: 'Add Course' },
    { path: '/add-blog', label: 'Add Blog', tooltip: 'Add Blog' },
  ];

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUserState);
  }

  ngOnInit() {
    this.userSubscription = this.user$.subscribe((user) => {
      this.logordash = user ? 'Dashboard' : 'Login';
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  toggleDrawer() {
    this.drawer.toggle();
  }

  closeDrawer() {
    this.drawer.close();
  }
}
