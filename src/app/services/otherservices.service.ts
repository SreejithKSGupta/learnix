import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherServices {

  private courseurl = 'http://localhost:3000/contactmessages';

  constructor(private http: HttpClient) {}
  submitContactForm(contactData: any): Observable<any> {
    return this.http.post<any>(this.courseurl, contactData).pipe(
      catchError(this.handleError('submitContactForm'))
    );
  }


  getAllContactMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.courseurl).pipe(
      catchError(this.handleError('getAllContactMessages', []))
    );
  }


  getContactMessageById(id: string): Observable<any> {
    const url = `${this.courseurl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError('getContactMessageById'))
    );
  }


  deleteContactMessage(id: string): Observable<any> {
    const url = `${this.courseurl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError('deleteContactMessage'))
    );
  }


  updateContactMessage(id: string, updatedData: any): Observable<any> {
    const url = `${this.courseurl}/${id}`;
    return this.http.put<any>(url, updatedData).pipe(
      catchError(this.handleError('updateContactMessage'))
    );
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as any);
    };
  }
}
