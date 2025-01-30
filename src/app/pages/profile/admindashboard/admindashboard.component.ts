import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../../interfaces/course';
import { Userservice } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { OtherServices } from '../../../services/otherservices.service';
import { Messages, Users } from '../../../interfaces/users';
import { MessagereplyComponent } from '../../../components/messagereply/messagereply.component';
import { AdmindataService } from '../../../services/admindata.service';
import { ChartOptions, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-admindashboard',
  standalone: false,
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  allusers!: Users[];
  allcourses!: Course[];
  allcontacts!: any[];
  currentuser!: any;
  allsubscribers!: any[];
  emailMessage: string = '';

  constructor(
    private userservice: Userservice,
    private dataservice: DataService,
    private otherServices: OtherServices,
    public dialog: MatDialog,
    private adminservice: AdmindataService
  ) {}


  ngOnInit(): void {
    this.currentuser = this.userservice.getcurrentuser();
    this.userservice.getusers().subscribe(userlist => {
      this.allusers = userlist;
    });
    this.dataservice.getcourses().subscribe(courseList => {
      this.allcourses = courseList;
    });
    this.otherServices.getAllContactMessages().subscribe(contactlist => {
      this.allcontacts = contactlist;
    });
    this.adminservice.getsubscribers().subscribe(subscribersList => {
      this.allsubscribers = subscribersList;
    });
  }

  deleteSubscriber(subscib:any): void {
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
        this.emailMessage = '';  // Clear input after sending
      },
      error: (err) => {
        console.error('Error sending email:', err);
      }
    });
  }

  // Existing methods for user and course management
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
    let messagedata: Messages = {
      id: String(Date.now()),
      senderID: this.currentuser.id,
      utype: 'admin',
      message: '',
      urgency: ''
    };

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
