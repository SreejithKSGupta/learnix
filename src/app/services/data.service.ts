import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  // protected url = 'http://localhost:000';

   getUsers(): Observable<any> {
     return this
             .http
               .get("https://jsonplaceholder.typicode.com/users")
             .pipe(
               map(res => res)
           );
       }

       getcourses(): Observable<any> {
         return this
                 .http
                   .get("http://localhost:3000/courses")
                 .pipe(
                   map(res => res)
               );
           }
}
