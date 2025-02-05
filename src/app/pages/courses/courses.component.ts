import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Course } from '../../interfaces/course';
import { Router} from '@angular/router';
import { User } from '../../interfaces/users';
import { Store } from '@ngrx/store';
import { selectUserState } from '../../store/selectors/user.selector';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  isauthenticated: boolean = false;
  userrole: string = '';
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  signeduser: User | undefined;
  user$: any;

  searchQuery: string = '';
  selectedFilter: string = '';
  filterValue: number | string = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectUserState);

    this.user$.subscribe((user: User | undefined) => {
      if (user) {
        this.signeduser = user;
        this.fetchCourses();
      }
    });

    if (this.user$.userrole) {
      let role = this.user$.userrole;
      if (role !== 'tutor' && role !== 'student' && role !== 'admin') {
        this.router.navigate(['/n404'], { queryParams: { errorCode: '21' } });
      }
    }
  }

  fetchCourses(): void {
    this.dataService.getcourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = [...this.courses];
      this.courses.forEach((course) => {
      });
    });
  }



  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter((course) => {
      const matchesSearch =
        course.courseName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.tutor.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesFilter =
        this.selectedFilter === 'tutor'
          ? course.tutor.toLowerCase().includes(this.filterValue.toString().toLowerCase())
          : this.selectedFilter === 'category'
          ? course.importantTechnologiesUsed.some(tech =>
              tech.toLowerCase().includes(this.filterValue.toString().toLowerCase())
            )
          : this.selectedFilter === 'duration'
          ? course.duration === this.filterValue
          : this.selectedFilter === 'credits'
          ? course.credits === this.filterValue
          : this.selectedFilter === 'fee'
          ? course.courseFee <= Number(this.filterValue)
          : this.selectedFilter === 'rating'
          ? (course.totalStars || 0) / (course.feedback?.length || 1) >= Number(this.filterValue)
          : this.selectedFilter === 'disabled'
          ? course.disabled === (this.filterValue === 'true')
          : true;

      return matchesSearch && matchesFilter;
    });
  }
}
