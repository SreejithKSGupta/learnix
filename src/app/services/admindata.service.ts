import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Userservice } from './user.service';
import { DataService } from './data.service';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class AdmindataService {
  suburl = 'http://localhost:3000/subscriberslist';
  constructor(private http: HttpClient, private userservices: Userservice, private dataservices: DataService,private emailservice:EmailService) { }

  addtosubscribers(emailid: string): Observable<any> {
    return this.http.post<any>(this.suburl, {emailid});
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as any);
    };
  }

  getsubscribers(): Observable<any> {
    return this.http.get(this.suburl).pipe(map((res) => res));
  }

  deleteSubscriber(subscriber: any): Observable<any> {

        this.emailservice.sendEmail(
          'othermsg',
           subscriber.emailid,
          "learner",
          "Learnix",
          "unsubscribed from Learnix",
          " you are removed fromthe subscription list as per your request. we hope to work with you soon."
         )



    return this.http.delete(`${this.suburl}/${subscriber.id}`);

  }

  sendBulkEmail(message: string, subscribers: any[]): Observable<any> {
    const emails = subscribers.map(subscriber => subscriber.emailid);
    console.log(emails, message);
    emails.forEach(email=>{
      this.emailservice.sendEmail(
       'messagereply',
      email,
      "Learner",
      "Learnix",
      "Message from Learnix",
      message
      )
    })
    return new Observable<any>
  }
}
