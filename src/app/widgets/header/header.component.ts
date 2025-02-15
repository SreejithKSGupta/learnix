import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from '../../interfaces/users';
import { selectUserState } from '../../store/selectors/user.selector';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  title = 'Learnix';
  logo = 'https://res.cloudinary.com/dhrye1aew/image/upload/v1737975952/zzmfodapfta2x4yeqzxs.webp';
  logordash: string = 'Login';
  user$: Observable<User | null>;
  userSubscription!: Subscription;
  scrollSubscription!: Subscription;
  isDrawerOpen = false;
  isScrolled = false;
  searchOpen = false;
  searchQuery = '';
  isDarkMode: boolean | undefined;
  notifications: any[] = [];

  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('searchInput') searchInput: any;

  navLinks = [
    {
      path: '/home',
      label: 'Home',
      tooltip: 'Go to Home',
      icon: 'home',
    },
    {
      path: '/courses',
      label: 'Courses',
      tooltip: 'Explore Courses',
      icon: 'school',
      // submenu: [
      //   { path: '/courses/all', label: 'All Courses', icon: 'list' },
      //   { path: '/courses/featured', label: 'Featured', icon: 'star' },
      //   { path: '/courses/my-learning', label: 'My Learning', icon: 'local_library' },
      // ]
    },
    {
      path: '/blogs',
      label: 'Blogs',
      tooltip: 'Read Blogs',
      icon: 'article',
      // submenu: [
      //   { path: '/blogs/latest', label: 'Latest Posts', icon: 'new_releases' },
      //   { path: '/blogs/trending', label: 'Trending', icon: 'trending_up' },
      //   { path: '/blogs/bookmarks', label: 'Bookmarks', icon: 'bookmarks' },
      // ]
    },
    {
      path: '#',
      label: 'More',
      tooltip: 'More',
      icon: 'library_books',
      submenu: [
        { path: '/faq', label: 'FAQ', tooltip: 'FAQs', icon: 'help' },
        { path: '/about', label: 'About', tooltip: 'About', icon: 'support' },
        {
          path: '/privacy',
          label: 'Privacy',
          tooltip: 'Privacy Policy',
          icon: 'description',
        },
        {
          path: '/contact',
          label: 'Contact',
          tooltip: 'Contact Us',
          icon: 'people',
        },
        {
          path: '/addcourse',
          label: 'Add Course',
          tooltip: 'Add Course',
          icon: 'description',
        },
        {
          path: '/add-blog',
          label: 'Add Blog',
          tooltip: 'Add Blog',
          icon: 'description',
        },
        {
          path: '/settings',
          label: 'Preferences',
          tooltip: 'Preferences',
          icon: 'preferences',
        },
        {
          path: '/features',
          label: 'Features',
          tooltip: 'Features',
          icon: 'features',
        },
      ],
    },
  ];

  constructor(private store: Store, private themeService: ThemeService) {
    this.user$ = this.store.select(selectUserState);
  }

  ngOnInit() {
    // User subscription
    this.userSubscription = this.user$.subscribe((user) => {
      this.logordash = user?.id ? 'Dashboard' : 'Login';
    });

    // Scroll behavior
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(throttleTime(100), distinctUntilChanged())
      .subscribe(() => {
        this.isScrolled = window.scrollY > 50;
      });
      this.themeService.getSettings().subscribe((settings) => {
        this.isDarkMode = settings.isDarkMode;
      });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.scrollSubscription?.unsubscribe();
  }

  // Close drawer when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.isDrawerOpen &&
      !target.closest('.drawer-content') &&
      !target.closest('.mobile-menu-button')
    ) {
      this.closeDrawer();
    }
  }

  toggleDrawer(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isDrawerOpen = !this.isDrawerOpen;
    this.drawer.toggle();
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    this.drawer.close();
  }

  onSearch(event: Event) {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }

  getNotificationCount() {
    return this.notifications.filter((n) => !n.read).length;
  }
}
