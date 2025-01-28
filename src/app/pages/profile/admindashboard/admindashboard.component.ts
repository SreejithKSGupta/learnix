import { Component } from '@angular/core';
import { Course } from '../../../interfaces/course';
import { Userservice } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { OtherServices } from '../../../services/otherservices.service';
import { Users } from '../../../interfaces/users';

@Component({
  selector: 'app-admindashboard',
  standalone: false,
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  allusers!: Users[];
  allcourses!: Course[] ;
  allcontacts!: any[]
  displayedColumns: string[] = ['name', 'email', 'usertype', 'status', 'action']; // For Users Table
  displayedColumnsCourses: string[] = ['courseName', 'tutor', 'duration', 'fee', 'status', 'action']; // For Courses Table
  displayedColumnsContacts: string[] = ['name', 'message', 'severity', 'type', 'email', 'actions']; // For Contact Messages Table

  constructor(
    private userservice: Userservice,
    private dataservice: DataService,
    private otherServices: OtherServices
  ) {}

  ngOnInit(): void {
    this.userservice.getusers().subscribe(userlist => {
      this.allusers = userlist;
    });
    this.dataservice.getcourses().subscribe(courseList => {
      this.allcourses = courseList;
    });
    this.otherServices.getAllContactMessages().subscribe(contactlist => {
      this.allcontacts = contactlist;
    });
  }

  deleteContactMessage(id: string): void {
    this.otherServices.deleteContactMessage(id).subscribe({
      next: () => {
        console.log('Contact message deleted:', id);
        this.allcontacts = this.allcontacts!.filter(msg => msg.id !== id);
      },
      error: (err) => {
        console.error('Error deleting contact message:', err);
      }
    });
  }

  disableUser(id: String): void {
    this.userservice.disableUser(id).subscribe({
      next: () => {
        console.log('User disabled:', id);
        const user = this.allusers!.find(u => u.id == id);
        if (user) {
          user.disabled = 'true';
        }
      },
      error: (err) => {
        console.error('Error disabling user:', err);
      }
    });
  }

  disableCourse(id: string): void {
    this.dataservice.disableCourse(id).subscribe({
      next: () => {
        console.log('Course disabled:', id);
        const course = this.allcourses!.find(c => c.id === id);
        if (course) {
          course.disabled = 'true';
        }
      },
      error: (err) => {
        console.error('Error disabling course:', err);
      }
    });
  }

  replyToMessage(id: string): void {
    alert(`Replying to message with ID: ${id}`);
    // Here you would add logic for the actual reply, but for now it shows an alert.
  }
}
