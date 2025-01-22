import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  courseurl = 'http://localhost:3000/courses';
  testurl = "https://jsonplaceholder.typicode.com/users";

   getUsers(): Observable<any> {
     return this
             .http
               .get(this.testurl)
             .pipe(
               map(res => res)
           );
       }

       getcourses(): Observable<any> {
         return this
                 .http
                   .get(this.courseurl)
                 .pipe(
                   map(res => res)
               );
           }

           addcourse(item: any): Observable<any> {
            return this.http.post<any>(this.courseurl, item);
          }
}
