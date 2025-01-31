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
  styleUrls: ['./admindashboard.component.css'],
})
export class AdmindashboardComponent implements OnInit {
  allusers!: User[];
  allcourses!: Course[];
  allcontacts!: any[];
  allsubscribers!: any[];
  emailMessage: string = '';
  statistics: any;
  user$: Observable<User | null>;

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
    forkJoin({
      users: this.userservice.getusers(),
      courses: this.dataservice.getcourses(),
      contacts: this.otherServices.getAllContactMessages(),
      subscribers: this.adminservice.getsubscribers(),
    }).subscribe(({ users, courses, contacts, subscribers }) => {
      this.allusers = users;
      this.allcourses = courses;
      this.allcontacts = contacts;
      this.allsubscribers = subscribers;
      this.updateStatistics();
    });
  }

  updateStatistics(): void {
    if (!this.allusers || !this.allcourses || !this.allsubscribers || !this.allcontacts) return;

    this.statistics = {
      users: {
        id: 'users',
        labels: ['Active', 'Disabled'],
        values: [
          this.allusers.filter((user) => !user.disabled).length,
          this.allusers.filter((user) => user.disabled).length,
        ],
        type: 'pie',
        heading: 'User Status Distribution',
        backgroundcolor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        bordercolor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        width: '400',
      },

      userRoles: {
        id: 'userRoles',
        labels: ['Students', 'Tutors', 'Disabled Users', 'Subscribers'],
        values: [
          this.allusers.filter((user) => user.userType === 'student').length,
          this.allusers.filter((user) => user.userType === 'tutor').length,
          this.allusers.filter((user) => user.disabled).length,
          this.allsubscribers.length,
        ],
        type: 'bar',
        heading: 'User Roles Distribution',
        backgroundcolor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgb(233, 64, 255)',
        ],
        bordercolor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgb(233, 64, 255)',
        ],
        borderWidth: 1,
        width: '500',
      },
    };
  }

  deleteSubscriber(subscriber: any): void {
    this.otherServices.showalert('confirm', 'Delete Subscriber?').subscribe((res) => {
      if (res === 'confirmed') {
        this.adminservice.deleteSubscriber(subscriber).subscribe({
          next: () => {
            this.allsubscribers = this.allsubscribers.filter((sub) => sub.id !== subscriber.id);
            this.otherServices.showalert('success', 'Subscriber deleted successfully.');
          },
          error: () => {
            this.otherServices.showalert('info', 'Error deleting subscriber.');
          },
        });
      }
    });
  }

  sendEmailToAll(): void {
    if (!this.emailMessage.trim()) {
      this.otherServices.showalert('info', 'Please enter a message before sending.');
      return;
    }

    this.adminservice.sendBulkEmail(this.emailMessage, this.allsubscribers).subscribe({
      next: () => {
        this.otherServices.showalert('success', 'Email sent to all subscribers!');
        this.emailMessage = '';
      },
      error: () => {
        this.otherServices.showalert('info', 'Error sending email.');
      },
    });
  }

  deleteContactMessage(id: string): void {
    this.otherServices.showalert('confirm', 'Delete this message?').subscribe((res) => {
      if (res === 'confirmed') {
        this.otherServices.deleteContactMessage(id).subscribe({
          next: () => {
            this.allcontacts = this.allcontacts.filter((msg) => msg.id !== id);
            this.otherServices.showalert('success', 'Message deleted successfully.');
          },
          error: () => {
            this.otherServices.showalert('info', 'Error deleting message.');
          },
        });
      }
    });
  }

  disableUser(id: string): void {
    this.otherServices.showalert('confirm', 'Disable this user?').subscribe((res) => {
      if (res === 'confirmed') {
        this.userservice.disableUser(id).subscribe({
          next: () => {
            const user = this.allusers.find((u) => u.id === id);
            if (user) user.disabled = true;
            this.otherServices.showalert('success', 'User disabled successfully.');
          },
          error: () => {
            this.otherServices.showalert('info', 'Error disabling user.');
          },
        });
      }
    });
  }

  disableCourse(id: string): void {
    this.otherServices.showalert('confirm', 'Disable this course?').subscribe((res) => {
      if (res === 'confirmed') {
        this.dataservice.disableCourse(id).subscribe({
          next: () => {
            const course = this.allcourses.find((c) => c.id === id);
            if (course) course.disabled = true;
            this.otherServices.showalert('success', 'Course disabled successfully.');
          },
          error: () => {
            this.otherServices.showalert('info', 'Error disabling course.');
          },
        });
      }
    });
  }

  replyToMessage(id: string): void {
    let messagedata: Message = {
      id: String(Date.now()),
      senderId: '',
      userType: 'admin',
      message: '',
      urgency: 'Low',
    };

    this.user$.subscribe((user) => {
      if (user?.id) {
        messagedata.senderId = user.id;
      }
    });

    const dialogRef = this.dialog.open(MessagereplyComponent, {
      width: '250px',
      data: { message: messagedata.message, urgency: messagedata.urgency },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        messagedata.message = result.message;
        messagedata.urgency = result.urgency;

        this.otherServices.replytomail(id, messagedata).subscribe({
          next: () => {
            this.otherServices.showalert('success', 'Reply sent successfully.');
          },
          error: () => {
            this.otherServices.showalert('info', 'Error sending reply.');
          },
        });
      }
    });
  }
}
