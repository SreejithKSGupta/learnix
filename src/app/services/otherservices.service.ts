import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherServices {

  courseurl = 'http://localhost:3000/contactmessages';

  constructor(private http: HttpClient) {}

  /**
   * Submits the contact form data to the JSON server
   * @param contactData - The contact form data
   * @returns Observable<any> - The observable of the HTTP POST request
   */
  submitContactForm(contactData: any): Observable<any> {
    return this.http.post<any>(this.courseurl, contactData);
  }
}
