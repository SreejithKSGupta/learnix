import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  courseurl = 'http://localhost:3000/courses';
  testurl = 'https://jsonplaceholder.typicode.com/users';



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

  updateCourse(courseData: any, id:string) {
    const url = `${this.courseurl}/${id}`;
    return this.http.put<any>(url, courseData);
  }
  disableCourse(id: string): Observable<any> {
    const url = `${this.courseurl}/${id}`;
    return this.http.get<any>(url).pipe(
      switchMap((course) => {
        course.disabled = 'true'; // Mark the course as disabled
        return this.http.put<any>(url, course); // Update the course with the new status
      }),
      catchError((error) => {
        console.error('Error disabling course:', error);
        return of(null); // Return null on error
      })
    );
  }
  addcomment(coursedata:Course, comment: Comment): Observable<Course> {
    let courseurll = `${this.courseurl}/${coursedata.id}`;
    return this.http.put<Course>(courseurll, coursedata);
}

}
