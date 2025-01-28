import { Course } from './../interfaces/course';
import { Users } from '../interfaces/users';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UserCourses } from '../interfaces/users';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root',
})
export class Userservice {
  private authStateSubject = new BehaviorSubject<boolean>(
    this.isauthenticated()
  ); // Default value is based on localStorage
  public authState$ = this.authStateSubject.asObservable(); // Observable to subscribe to

  constructor(private http: HttpClient, private dataservice: DataService) {}

  userurl = 'http://localhost:3000/users';

  getusers(): Observable<any> {
    return this.http.get(this.userurl).pipe(map((res) => res));
  }

  adduser(item: any): Observable<any> {
    return this.http.post<any>(this.userurl, item);
  }

  removeuser(id: String): Observable<any> {
    const url = `${this.userurl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError((error) => {
        return of(null);
      })
    );
  }

  getuserbyid(id: String): Observable<any> {
    const url = `${this.userurl}/${id}`;
    return this.http.get<any>(url);
  }

  updateuser(userData: any) {
    const url = `${this.userurl}/${userData.id}`;
    return this.http.put(`${url}`, userData);
  }

  isauthenticated(): boolean {
    const userl = localStorage.getItem('user') || 'null';
    const user = JSON.parse(userl);
    return user !== null;
  }

  signout() {
    console.log('Signing out from services');
    localStorage.removeItem('user');
    this.authStateSubject.next(false); // Notify subscribers that user is signed out
  }

  signin(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.authStateSubject.next(true); // Notify subscribers that user is signed in
  }

  userrole(): string {
    const userl = localStorage.getItem('user') || 'null';
    const user = JSON.parse(userl);
    return user?.usertype || ''; // Optional chaining for safety
  }

  enrollToCourse(UserId: String, courseData: UserCourses): Observable<any> {
    console.log(`Adding course: ${courseData.id} to user ${UserId}`);
    const url = `${this.userurl}/${UserId}`;
    return this.http.get<any>(url).pipe(
      switchMap((user) => {
        user.courses.push(courseData);
        return this.http.put<any>(url, user);
      })
    );
  }

  disableUser(id: String): Observable<any> {
    const url = `${this.userurl}/${id}`;
    return this.http.get<any>(url).pipe(
      switchMap((user) => {
        user.disabled = 'true'; // Mark the user as disabled
        return this.http.put<any>(url, user); // Update the user with the new status
      }),
      catchError((error) => {
        console.error('Error disabling user:', error);
        return of(null); // Return null on error
      })
    );
  }

  removeFromCourse(userID: string, courseID: String): Observable<any> {
    console.log(`Removing course: ${courseID} from user ${userID}`);
    const url = `${this.userurl}/${userID}`;

    return this.http.get<any>(url).pipe(
      switchMap((user) => {
        const courseIndex = user.courses.findIndex((course: UserCourses) => course.id === courseID);

        if (courseIndex !== -1) {
          user.courses.splice(courseIndex, 1);
        } else {
          console.error(`Course with ID ${courseID} not found in user's courses.`);
        }

        return this.http.put<any>(url, user);
      })
    );
  }
}
