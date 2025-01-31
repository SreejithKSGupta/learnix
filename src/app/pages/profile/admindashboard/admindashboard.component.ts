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
import { forkJoin } from 'rxjs';


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



    statistics = {
      dummydata : {
        id:"dummydata",
        labels : ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        values : [12, 19, 3, 5, 2, 3],
        color :  ['rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(255, 0, 247)',
          'rgb(70, 174, 0)'],
        type: 'bar',
        heading: "Occuruence of colors",
        backgroundcolor:'rgba(75, 192, 192, 0.2)',
        bordercolor:'rgba(75, 192, 192, 1)',
        borderWidth:1,
        width:'500'
        },
      users: {
        id:"users",
        labels: ['Active', 'Disabled'],
        values: [
          this.allusers?.filter(user => !user.disabled).length || 0,
          this.allusers?.filter(user => user.disabled).length || 0
        ],
        type: 'pie',
        heading: 'User Status Distribution',
        backgroundcolor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        bordercolor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        width: '400'
      },

      courses: {
        id:"courses",
        labels: ['Active', 'Disabled'],
        values: [
          this.allcourses?.filter(course => !course.disabled).length || 0,
          this.allcourses?.filter(course => course.disabled).length || 0
        ],
        type: 'pie',
        heading: 'Course Status Distribution',
        backgroundcolor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 159, 64, 0.5)'],
        bordercolor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
        width: '400'
      },

      subscribers: {
        id:"subscribers",
        labels: ['Total Subscribers'],
        values: [this.allsubscribers?.length || 0],
        type: 'bar',
        heading: 'Total Subscribers',
        backgroundcolor: 'rgba(153, 102, 255, 0.5)',
        bordercolor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        width: '400'
      },

      contactMessages: {
        id:"contact messages",
        labels: ['Total Messages'],
        values: [this.allcontacts?.length || 0],
        type: 'bar',
        heading: 'Total Contact Messages',
        backgroundcolor: 'rgba(255, 206, 86, 0.5)',
        bordercolor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        width: '400'
      }
    };

  constructor(
    private userservice: Userservice,
    private dataservice: DataService,
    private otherServices: OtherServices,
    public dialog: MatDialog,
    private adminservice: AdmindataService
  ) {}

  ngOnInit(): void {
    this.currentuser = this.userservice.getcurrentuser();

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

      // Now we update statistics since all data is available
      this.updateStatistics();
    });
  }
  updateStatistics(): void {
    this.statistics = {
      dummydata: {
        id: "dummydata",
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        values: [12, 19, 3, 5, 2, 3],
        color: ['rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(255, 0, 247)',
                'rgb(70, 174, 0)'],
        type: 'bar',
        heading: "Occurrence of colors",
        backgroundcolor: 'rgba(75, 192, 192, 0.2)',
        bordercolor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        width: '500'
      },
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
      subscribers: {
        id: "subscribers",
        labels: ['Total Subscribers'],
        values: [this.allsubscribers.length],
        type: 'bar',
        heading: 'Total Subscribers',
        backgroundcolor: 'rgba(153, 102, 255, 0.5)',
        bordercolor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        width: '400'
      },
      contactMessages: {
        id: "contact messages",
        labels: ['Total Messages'],
        values: [this.allcontacts.length],
        type: 'bar',
        heading: 'Total Contact Messages',
        backgroundcolor: 'rgba(255, 206, 86, 0.5)',
        bordercolor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        width: '400'
      }
    };
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
