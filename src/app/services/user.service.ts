import { Course } from './../interfaces/course';
import { User } from './../pages/profile/login/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UserCourses } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  private authStateSubject = new BehaviorSubject<boolean>(this.isauthenticated()); // Default value is based on localStorage
  public authState$ = this.authStateSubject.asObservable(); // Observable to subscribe to

  constructor(private http: HttpClient) {}

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
        switchMap(user => {
            user.courses.push(courseData);
            return this.http.put<any>(url, user);
        })
    );
}
}
