// courses.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { Course } from '../../interfaces/course';
import { User } from '../../interfaces/users';
import { selectUserState } from '../../store/selectors/user.selector';
import { PageEvent } from '@angular/material/paginator';

interface FilterState {
  searchQuery: string;
  filterType: string;
  filterValue: string | number;
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'app-courses',
  standalone:false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  filterState$ = new BehaviorSubject<FilterState>({
    searchQuery: '',
    filterType: '',
    filterValue: '',
    pageIndex: 0,
    pageSize: 4
  });

  courses: Course[] = [];
  filteredCourses: Course[] = [];
  displayedCourses: Course[] = [];
  totalCourses = 0;
  loading = false;
  signedUser?: User;

  // Pagination
  pageSizeOptions = [4,12, 24, 48, 96];

  // Filter options
  filterOptions = [
    { value: '', label: 'All Courses' },
    { value: 'tutor', label: 'By Tutor' },
    { value: 'category', label: 'By Category' },
    { value: 'duration', label: 'By Duration' },
    { value: 'credits', label: 'By Credits' },
    { value: 'fee', label: 'By Course Fee' },
    { value: 'rating', label: 'By Rating' },
    { value: 'disabled', label: 'Show Disabled' }
  ];

  constructor(
    private dataService: DataService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Subscribe to user state
    this.store.select(selectUserState).subscribe(this.handleUserState.bind(this));

    // Subscribe to filter changes
    this.filterState$
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        takeUntil(this.destroy$)
      )
      .subscribe(this.handleFilterChange.bind(this));
  }

  private handleUserState(user: User | undefined): void {
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    if (!['tutor', 'student', 'admin' ,undefined].includes(user.userType)) {
      this.router.navigate(['/n404'], { queryParams: { errorCode: '21' } });
      return;
    }

    this.signedUser = user;
    this.fetchCourses();
  }

  private handleFilterChange(filterState: FilterState): void {
    if (!this.courses.length) return;

    this.loading = true;
    try {
      this.applyFilters(filterState);
    } finally {
      this.loading = false;
    }
  }

  private async fetchCourses(): Promise<void> {
    this.loading = true;
    try {
      const courses = await this.dataService.getcourses().toPromise();
      if (courses) {
        this.courses = courses;
        this.applyFilters(this.filterState$.value);
      }
    } catch (error) {
      // Handle error appropriately
    } finally {
      this.loading = false;
    }
  }

  private applyFilters(filterState: FilterState): void {
    const { searchQuery, filterType, filterValue, pageIndex, pageSize } = filterState;

    // Apply filters
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = !searchQuery ||
        course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tutor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = this.matchesFilterCriteria(course, filterType, filterValue);

      return matchesSearch && matchesFilter;
    });

    // Update total and paginate
    this.totalCourses = this.filteredCourses.length;
    this.paginateCourses(pageIndex, pageSize);
  }

  private matchesFilterCriteria(course: Course, filterType: string, filterValue: string | number): boolean {
    if (!filterType || !filterValue) return true;

    switch (filterType) {
      case 'tutor':
        return course.tutor.toLowerCase().includes(String(filterValue).toLowerCase());
      case 'category':
        return course.importantTechnologiesUsed.some(tech =>
          tech.toLowerCase().includes(String(filterValue).toLowerCase())
        );
      case 'duration':
        return course.duration === Number(filterValue);
      case 'credits':
        return course.credits === Number(filterValue);
      case 'fee':
        return course.courseFee <= Number(filterValue);
      case 'rating':
        const avgRating = (course.totalStars || 0) / (course.feedback?.length || 1);
        return avgRating >= Number(filterValue);
      case 'disabled':
        return course.disabled === (filterValue === 'true');
      default:
        return true;
    }
  }

  private paginateCourses(pageIndex: number, pageSize: number): void {
    const startIndex = pageIndex * pageSize;
    this.displayedCourses = this.filteredCourses.slice(startIndex, startIndex + pageSize);
  }

  // Event handlers
  onSearchChange(value: string): void {
    this.updateFilterState({ searchQuery: value });
  }

  onFilterTypeChange(filterType: string): void {
    this.updateFilterState({
      filterType,
      filterValue: '',
      pageIndex: 0
    });
  }

  onFilterValueChange(value: string): void {
    this.updateFilterState({ filterValue: value });
  }

  onPageChange(event: PageEvent): void {
    this.updateFilterState({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize
    });
  }

  private updateFilterState(update: Partial<FilterState>): void {
    this.filterState$.next({
      ...this.filterState$.value,
      ...update
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
