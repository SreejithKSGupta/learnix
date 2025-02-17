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
import { MatDialog } from '@angular/material/dialog';
import { MessagereplyComponent } from '../../../components/messagereply/messagereply.component';
import { Comment } from './../../../interfaces/comment';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user$: Observable<User | null>;
  courses: Course[] = [];
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

    this.user$.subscribe(res=>{
      this.user=res!;
    })
    let suerid=JSON.parse(localStorage.getItem('users')||'null')
    if(!suerid){
      this.router.navigate(['/signin']);
    }
    this.scrollifhash();
  }

  scrollifhash() {
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        console.log(hash);

        // Remove the '#' from the hash value before using it with getElementById
        const elementId = hash.replace('#', '');

        const element = document.getElementById(elementId);

        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error(`Element with ID ${elementId} not found.`);
        }
      }
    }, 1000);
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


    deleteMessage(message: any) {
      this.userservice
        .removemessagefromuser(this.user!.id, message.id)
        .subscribe({
          next: (res) => {
            this.user = {
              ...this.user,
              messages:
                this.user!.messages?.filter((msg) => msg.id !== message.id) || [],
            };
            alert('Message removed successfully');
          },
          error: (err) => {
            console.log('Error removing message:', err);
          },
        });
    }

     replyToMsg(oldmsg: Comment): void {
      console.log(oldmsg.senderId);

       this.userservice.getuserbyid(oldmsg.senderId).subscribe((res) => {
         let messagedata: Comment = {
           id: String(Date.now()),
           senderId: this.user.id,
           senderName: this.user.name,
           senderType: this.user.userType,
           senderImg: this.user.imageUrl,
           recieverType: res.userType,
           recieverName: res.name,
           recieverId: res.id,
           message: '',
           timestamp: new Date(),
           urgency: 'Low',
           status: 'pending',
         };



         const dialogRef = this.dialog.open(MessagereplyComponent, {
           width: '250px',
           data: { message: messagedata.message, urgency: messagedata.urgency },
         });

         dialogRef.afterClosed().subscribe((result) => {
           if (result) {
             messagedata.message = result.message;
             messagedata.urgency = result.urgency;

             this.otherServices.replytomail(oldmsg.senderId, messagedata).subscribe({
               next: () => {
                 this.otherServices.showalert(
                   'success',
                   'Reply sent successfully.'
                 );
               },
               error: () => {
                 this.otherServices.showalert('info', 'Error sending reply.');
               },
             });
           }
         });
       });
     }

    markasread(message: any) {
      this.userservice
       .markasread(this.user!.id, message.id)
       .subscribe({
          next: (res) => {
            this.user = {
              ...this.user,
              messages:
               this.user!.messages?.map((msg) =>
                 msg.id === message.id ? { ...msg, read: true } : msg
                ) || [],
                };
            alert('Message marked as read');
            },
          error: (err) => {
            console.log('Error marking message as read:', err);
            },
          });
    }
}
