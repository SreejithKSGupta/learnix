import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  courseurl = 'http://localhost:3000/courses';
  testurl = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<any> {
    return this.http.get(this.testurl).pipe(map((res) => res));
  }

  getcourses(): Observable<any> {
    return this.http.get(this.courseurl).pipe(map((res) => res));
  }

  addcourse(item: any): Observable<any> {
    return this.http.post<any>(this.courseurl, item);
  }

  removecourse(id: string): Observable<any> {
    const url = `${this.courseurl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError((error) => {
        return of(null);
      })
    );
  }

  getcoursebyid(id: string): Observable<any> {
    const url = `${this.courseurl}/${id}`;
    return this.http.get<any>(url);
  }

  updateCourse(courseData: any) {
    const url = `${this.courseurl}/${courseData.id}`;
    return this.http.put<any>(url, courseData);
  }

}
