import { OtherServices } from './../../../services/otherservices.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Userservice } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { Course } from '../../../interfaces/course';
import { User } from '../../../interfaces/users';
import { selectUserState } from '../../../store/selectors/user.selector';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user$: Observable<User | null>;
  courses: Course[] = [];

  constructor(
    private router: Router,
    private userservice: Userservice,
    private dataservice: DataService,
    private store: Store,
    private otherServices: OtherServices
  ) {
    this.user$ = this.store.select(selectUserState);
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    let suerid=JSON.parse(localStorage.getItem('users')||'null')
    if(!suerid){
      this.router.navigate(['/signin']);
    }
  }
  }

  logout(): void {
    this.otherServices.showalert('confirm', 'Do you really want to Logout?').subscribe((result) => {
      if (result === 'yes') {
        this.userservice.signout();
        this.router.navigate(['/signin']);
      }
    });
  }

  editprofile(id: string): void {
    this.otherServices.showalert("info", 'Editing profile').subscribe((result) => {
      this.router.navigate(['/login'], { queryParams: { id: id } });
    });
  }
}
