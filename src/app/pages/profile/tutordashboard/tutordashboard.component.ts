import { Comment } from './../../../interfaces/comment';
import { OtherServices } from './../../../services/otherservices.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { Userservice } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { Course } from '../../../interfaces/course';
import { User } from '../../../interfaces/users';
import { managerUserChange } from '../../../store/actions/user.action';
import { selectUserState } from '../../../store/selectors/user.selector';
import { CloudinarymanagerService } from '../../../services/cloudinarymanager.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagereplyComponent } from '../../../components/messagereply/messagereply.component';

@Component({
  selector: 'app-tutordashboard',
  standalone: false,

  templateUrl: './tutordashboard.component.html',
  styleUrl: './tutordashboard.component.css'
})
export class TutordashboardComponent {
  courses: Course[] = [];
  user$: Observable<User | null>;
  user!:User;
  constructor(
    private router: Router,
    private userservice: Userservice,
    private dataservice: DataService,
    private store: Store,
    private otherServices: OtherServices,
    private dialog :MatDialog,
  ) {
    this.user$ = this.store.select(selectUserState);
  }

  ngOnInit(): void {
    this.user$.pipe(
      tap({
        next: (userData) => {
        },
        error: (err) => console.error('Error fetching user data:', err),
      })
    ).subscribe(res=>{
      this.loadUserCourses(res!.name);


    }

    );
  }
private loadUserCourses(username: string): void {
  this.dataservice.getcourses().subscribe(allcourses => {
    allcourses.forEach((courseItem:any) => {
      if(courseItem.tutor==username){
        this.courses.push(courseItem);
      }
    });
  });

}

}
