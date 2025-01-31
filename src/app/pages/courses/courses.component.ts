import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../interfaces/course';
import { Router, ActivatedRoute } from '@angular/router';
import { Userservice } from '../../services/user.service';
import { User } from '../../interfaces/users';
import { Store } from '@ngrx/store';
import { selectUserState } from '../../store/selectors/user.selector';
import { OtherServices } from '../../services/otherservices.service';
import { ModelwindowComponent } from '../../components/modelwindow/modelwindow.component';

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
  subscriptionStatuses: { [courseId: string]: boolean } = {};
  user$: any;

  searchQuery: string = '';
  selectedFilter: string = '';
  filterValue: number | string = '';

  constructor(
    private dataService: DataService,
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
        this.fetchCourses();
        this.checkForCourseId();
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
      this.filteredCourses = [...this.courses]; // Initialize filtered courses
      this.courses.forEach((course) => {
        this.isUserEnrolledToCourse(course.id!);
      });
    });
  }

  openCourseDetails(course: Course): void {
    this.dialog.open(ModelwindowComponent, {
      data: {
        course,
        isEnrolled: this.subscriptionStatuses[course.id!],
        isTutor: this.userrole === 'tutor',
        enroll: this.enrollToCourse.bind(this),
        editCourse: this.editcourseitem.bind(this),
      },
      width: '400px',
    });
  }

  enrollToCourse(id: string): void {
    if (this.signeduser) {
      const coursedata = {
        id: id,
        expiry: Date.now() + 60 * 24 * 60 * 60 * 1000,
        date: Date.now(),
        completion: 0,
      };
      this.userservice
        .enrollToCourse(this.signeduser.id, coursedata)
        .subscribe(() => {
          this.subscriptionStatuses[id] = true;
        });
    }
  }

  isUserEnrolledToCourse(courseId: string): void {
    if (!this.signeduser || !this.signeduser.courses) {
      this.subscriptionStatuses[courseId] = false;
      return;
    }
    this.subscriptionStatuses[courseId] = this.signeduser.courses.some(
      (course: any) => course.id === courseId
    );
  }

  checkForCourseId(): void {
    this.route.queryParams.subscribe((params) => {
      const courseId = params['cid'];
      if (courseId) {
        const course = this.courses.find((c) => c.id === courseId);
        if (course) {
          this.openCourseDetails(course);
        }
      }
    });
  }

  editcourseitem(item: any): void {
    this.otherServices
      .showalert('confirm', 'Editing Blog?')
      .subscribe((result) => {
        if (result == 'yes') {
          console.log('editing course', item);
          this.router.navigate(['/addcourse'], { queryParams: { id: item } });
        }
      });
  }

  // Handle search changes
  onSearchChange(): void {
    this.applyFilters();
  }

  // Handle filter changes
  onFilterChange(): void {
    this.applyFilters();
  }

  // Apply search and filter to the course list
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
