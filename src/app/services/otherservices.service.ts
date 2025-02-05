import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EmailService } from './email.service';
import { Message } from '../interfaces/users';


@Injectable({
  providedIn: 'root',
})
export class OtherServices {
  userurl = 'http://localhost:3000/users';
  private appdataurl = 'http://localhost:3000/appdata';
  private courseurl = 'http://localhost:3000/contactmessages';

  constructor(private http: HttpClient, private emailservice: EmailService) {}
  submitContactForm(contactData: any): Observable<any> {
    const { name, email, phone, message, severity, type } = contactData;

    const emailMessage = `Hi Sreejith, you got a message from ${contactData.name}.
                           message is : ${contactData.message} ,
                           Severity :${contactData.severity} ,
                           type:${contactData.type} ,
                           email:${contactData.email}

                           Connect with them proptly.
                           `;

    this.emailservice
      .sendEmail(
        'contactmessage',
        'sreejithksgupta2255@gmail.com',
        'Sreejith KS',
        contactData.name,
        'Someone messaged you',
        emailMessage
      )
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
      this.showalert('success', 'Email sent successfully')
      .subscribe((result) => {
       })
    this.http
      .post<any>(this.courseurl, contactData)
      .pipe(catchError(this.handleError('submitContactForm')))
      .subscribe(
        (res) => console.log('Form submitted successfully:', res),
        (err) => console.error('Error submitting form:', err)
      );

    return new Observable<any>();
  }
  showalert(type: string, data: any): Observable<any> {
    let messages: {
      [key: string]: {
        title: string;
        text?: any;
        showDenyButton: boolean;
        showCancelButton: boolean;
        confirmButtonText: string;
        denyButtonText: string;
        icon: SweetAlertIcon;
      };
    } = {
      confirm: {
        title: data? data:'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        icon: 'question',
      },
      info: {
        title: 'Information',
        text: data,
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: 'OK',
        denyButtonText: '',
        icon: 'info',
      },
      success: {
        title: 'Success',
        text: data,
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: 'OK',
        denyButtonText: '',
        icon: 'success',
      },
    };

    let selectedMessage =
      messages[type as keyof typeof messages] || messages['confirm'];

    return new Observable((observer) => {
      Swal.fire({
        title: selectedMessage.title,
        text: selectedMessage.text || '',
        showDenyButton: selectedMessage.showDenyButton,
        showCancelButton: selectedMessage.showCancelButton,
        confirmButtonText: selectedMessage.confirmButtonText,
        denyButtonText: selectedMessage.denyButtonText,
        icon: selectedMessage.icon,
      }).then((result) => {
        if (result.isConfirmed) {
          observer.next('yes');
          if (type === 'success') {
            // Swal.fire("Operation Successful!", "", "success");
          } else {
            // Swal.fire("Confirmed!", "", "success");
          }
        } else if (result.isDenied) {
          observer.next('no');
          // Swal.fire('Cancelled', '', 'info');
        }
        observer.complete();
      });
    });
  }

  replytomail(UserId: String, message: Message): Observable<any> {
    let emailMessage = `${message.message} with urgence ${message.urgency}`;
    this.emailservice
      .sendEmail(
        'messagereply',
        'sreejithksgupta2255@gmail.com',
        'Sreejith KS',
        'Learner',
        'Learnix replied',
        emailMessage
      )
      .then((response) => {
        this.showalert('success', 'reply Sent')
        .subscribe((result) => {
         })

      })
      .catch((error) => {
        this.showalert('info', 'Unble to reply')
        .subscribe((result) => {
         })
      });
    if (UserId) {
      const url = `${this.userurl}/${UserId}`;
      return this.http.get<any>(url).pipe(
        switchMap((user) => {
          console.log(user);
          if (!user.messages) {
            user.messages = [];
          }
          user.messages.push(message);
          console.log(user.Message, UserId);
          return this.http.put<any>(url, user);
        })
      );
    } else {
      alert('only email will be sent');
      return new Observable<any>();
    }
  }

  getAllContactMessages(): Observable<any[]> {
    return this.http
      .get<any[]>(this.courseurl)
      .pipe(catchError(this.handleError('getAllContactMessages', [])));
  }

  getappdata(): Observable<any[]> {
    return this.http
      .get<any[]>(this.appdataurl)
      .pipe(catchError(this.handleError('getappdata', [])));
  }

  getContactMessageById(id: string): Observable<any> {
    const url = `${this.courseurl}/${id}`;
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError('getContactMessageById')));
  }

  deleteContactMessage(id: string): Observable<any> {
    const url = `${this.courseurl}/${id}`;
    return this.http
      .delete<any>(url)
      .pipe(catchError(this.handleError('deleteContactMessage')));
  }

  // updateContactMessage(id: string, updatedData: any): Observable<any> {
  //   const url = `${this.courseurl}/${id}`;
  //   return this.http
  //     .put<any>(url, updatedData)
  //     .pipe(catchError(this.handleError('updateContactMessage')));
  // }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as any);
    };
  }
}
