import { Messages } from './../interfaces/users';
import { Course } from './../interfaces/course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UserCourses } from '../interfaces/users';
import { DataService } from './data.service';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  private authStateSubject = new BehaviorSubject<boolean>(
    this.isauthenticated()
  ); // Default value is based on localStorage
  public authState$ = this.authStateSubject.asObservable(); // Observable to subscribe to

  constructor(private http: HttpClient, private dataservice: DataService,private emailservice:EmailService) {}

  userurl = 'http://localhost:3000/users';

  getusers(): Observable<any> {
    return this.http.get(this.userurl).pipe(map((res) => res));
  }

  adduser(item: any): Observable<any> {
    this.emailservice.sendEmail(
      'othermsg',
       item.email,
      item.name,
      "Learnix",
      "welcome to Learnix",
      "Welcome to learnix. we hope you have an excellent learning journey with us."
     )
    return this.http.post<any>(this.userurl, item);
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
    this.authStateSubject.next(true);
    this.emailservice.sendEmail(
      'othermsg',
       user.email,
      user.name,
      "Learnix",
      "Signed in to Learnix",
      "you just signed in to Learnix, if it was not you, contact immideatly."
     )
  }

  userrole(): string {
    const userl = localStorage.getItem('user') || 'null';
    const user = JSON.parse(userl);
    return user?.usertype || '';
  }


  getcurrentuser(): string {
    const userl = localStorage.getItem('user') || 'null';
    const user = JSON.parse(userl);
    return user || '';
  }

  enrollToCourse(UserId: String, courseData: UserCourses): Observable<any> {
    this.getuserbyid(UserId).subscribe(res=>{
      this.dataservice.getcoursebyid(courseData.id as string).subscribe(cdata=>{
        this.emailservice.sendEmail(
          'othermsg',
           res.email,
          res.name,
          "Learnix",
          `Enrolled to ${cdata.courseName}`,
          `you just enrolled to course ${cdata.courseName}, Happy learning`
         )
      })

    })
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
    this.getuserbyid(id).subscribe(res=>{

      this.emailservice.sendEmail(
        'othermsg',
         res.email,
        res.name,
        "Learnix",
        "Message from Learnix",
        " Your account has been removed from learnix due to policy violations"
       )
    })
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
    this.getuserbyid(userID).subscribe(res=>{
      this.dataservice.getcoursebyid(courseID as string).subscribe(cdata=>{
        this.emailservice.sendEmail(
          'othermsg',
           res.email,
          res.name,
          "Learnix",
          `Unenrolled from ${cdata.courseName}`,
          `you just unenrolled from course ${cdata.courseName},let us upskill together.`
         )
      })

    })
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
