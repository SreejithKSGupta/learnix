import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../../interfaces/course';
import { Userservice } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { OtherServices } from '../../../services/otherservices.service';
import { Message, User } from '../../../interfaces/users';
import { MessagereplyComponent } from '../../../components/messagereply/messagereply.component';
import { AdmindataService } from '../../../services/admindata.service';
import { forkJoin, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { managerUserChange } from '../../../store/actions/user.action';
import { selectUserState } from '../../../store/selectors/user.selector';
@Component({
  selector: 'app-admindashboard',
  standalone: false,
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  allusers!: User[];
  allcourses!: Course[];
  allcontacts!: any[];
  allsubscribers!: any[];
  emailMessage: string = '';
  statistics: any;

  // Define user$ within the component itself
  user$: Observable<User | null> ;

  constructor(
    private userservice: Userservice,
    private dataservice: DataService,
    private otherServices: OtherServices,
    public dialog: MatDialog,
    private adminservice: AdmindataService,
    private store: Store

  ) {
    this.user$ = this.store.select(selectUserState);

  }

  ngOnInit(): void {
    // Fetch all data at once using forkJoin
    forkJoin({
      users: this.userservice.getusers(),
      courses: this.dataservice.getcourses(),
      contacts: this.otherServices.getAllContactMessages(),
      subscribers: this.adminservice.getsubscribers()
    }).subscribe(({ users, courses, contacts, subscribers }) => {
      this.allusers = users;
      this.allcourses = courses;
      this.allcontacts = contacts;
      this.allsubscribers = subscribers;
      this.updateStatistics();
    });
  }

  updateStatistics(): void {
    if (!this.allusers || !this.allcourses || !this.allsubscribers || !this.allcontacts) {
      return;
    }

    this.statistics = {
      users: {
        id: "users",
        labels: ['Active', 'Disabled'],
        values: [
          this.allusers.filter(user => !user.disabled).length,
          this.allusers.filter(user => user.disabled).length
        ],
        type: 'pie',
        heading: 'User Status Distribution',
        backgroundcolor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        bordercolor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        width: '400'
      },

      userRoles: {
        id: "userRoles",
        labels: ['Students', 'Tutors', 'Disabled Users', 'Subscribers'],
        values: [
          this.allusers.filter(user => user.userType === 'student').length,
          this.allusers.filter(user => user.userType === 'tutor').length,
          this.allusers.filter(user => user.disabled).length,
          this.allsubscribers.length
        ],
        type: 'bar',
        heading: 'User Roles Distribution',
        backgroundcolor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(255, 159, 64, 0.5)', 'rgb(233, 64, 255)'],
        bordercolor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)', 'rgb(233, 64, 255)'],
        borderWidth: 1,
        width: '500'
      },

      courses: {
        id: "courses",
        labels: ['Active', 'Disabled'],
        values: [
          this.allcourses.filter(course => !course.disabled).length,
          this.allcourses.filter(course => course.disabled).length
        ],
        type: 'pie',
        heading: 'Course Status Distribution',
        backgroundcolor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 159, 64, 0.5)'],
        bordercolor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
        width: '400'
      },

      messageseverity: {
        id: "messageSeverity",
        labels: ['Low', 'Medium', 'High'],
        values: [
          this.allcontacts.filter(msg => msg.severity === 'Low').length,
          this.allcontacts.filter(msg => msg.severity === 'Medium').length,
          this.allcontacts.filter(msg => msg.severity === 'High').length
        ],
        type: 'pie',
        heading: 'Message Severity Distribution',
        backgroundcolor: ['rgba(47, 249, 47, 0.5)', 'rgba(164, 159, 9, 0.5)', 'rgba(251, 54, 0, 0.5)'],
        bordercolor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)'],
        borderWidth: 1,
        width: '400'
      },

      messageTypes: {
        id: "messageTypes",
        labels: ['General Inquiry', 'Support', 'Feedback'],
        values: [
          this.allcontacts.filter(msg => msg.type === 'General Inquiry').length,
          this.allcontacts.filter(msg => msg.type === 'Support').length,
          this.allcontacts.filter(msg => msg.type === 'Feedback').length
        ],
        type: 'bar',
        heading: 'Message Type Distribution',
        backgroundcolor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 205, 86, 0.5)'],
        bordercolor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)'],
        borderWidth: 1,
        width: '400'
      }
    };
  }

  deleteSubscriber(subscib: any): void {
    this.adminservice.deleteSubscriber(subscib).subscribe({
      next: () => {
        console.log('Subscriber deleted:', subscib.id);
        this.allsubscribers = this.allsubscribers.filter(sub => sub.id !== subscib.id);
      },
      error: (err) => {
        console.error('Error deleting subscriber:', err);
      }
    });
  }

  sendEmailToAll(): void {
    if (!this.emailMessage.trim()) {
      alert("Please enter a message before sending.");
      return;
    }

    this.adminservice.sendBulkEmail(this.emailMessage, this.allsubscribers).subscribe({
      next: () => {
        alert("Email sent to all subscribers!");
        this.emailMessage = '';
      },
      error: (err) => {
        console.error('Error sending email:', err);
      }
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
          user.disabled = true;
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
          course.disabled = true;
        }
      },
      error: (err) => {
        console.error('Error disabling course:', err);
      }
    });
  }

  replyToMessage(id: string): void {
    let messagedata: Message = {
      id: String(Date.now()),
      senderId: '', // Will be set when the user data is available
      userType: 'admin',
      message: '',
      urgency: 'Low'
    };

    // Subscribe to the user$ observable to get the current user
    this.user$.subscribe(user => {
      if (user?.id) {
        messagedata.senderId = user.id; // Set senderId based on current user
      }
    });

    const dialogRef = this.dialog.open(MessagereplyComponent, {
      width: '250px',
      data: { message: messagedata.message, urgency: messagedata.urgency }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        messagedata.message = result.message;
        messagedata.urgency = result.urgency;

        this.otherServices.replytomail(id, messagedata).subscribe(res => {
          alert('Success');
        });
      }
    });
  }
}
