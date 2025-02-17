import { Comment } from './../interfaces/comment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UserCourse } from '../interfaces/users';
import { DataService } from './data.service';
import { EmailService } from './email.service';
import { Store } from '@ngrx/store';
import { managerUserChange } from '../store/actions/user.action';
import { selectUserState } from '../store/selectors/user.selector';
import { OtherServices } from './otherservices.service';
@Injectable({
  providedIn: 'root',
})
export class Userservice {
  private authStateSubject = new BehaviorSubject<boolean>(false);
  public authState$ = this.authStateSubject.asObservable();
  user$!: Observable<any>;
  userurl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private dataservice: DataService,
    private emailservice: EmailService,
    private store: Store,
    private otherservices: OtherServices
  ) {}

  checkauthentication(): void {

    const savedUser = JSON.parse(localStorage.getItem('users') || 'null');
    if (savedUser) {
      this.authStateSubject.next(true);
      this.getuserbyid(savedUser).subscribe((user) => {
        this.store.dispatch(managerUserChange({ user }));
      });
    }
  }

  getusers(): Observable<any> {
    return this.http.get(this.userurl).pipe(map((res) => res));
  }

  checkIfUserExists(item: any): Observable<boolean> {
    return this.http.get<any[]>(this.userurl).pipe(
      map((users) => {
        const existingUser = users.find(
          (user) =>
            user.email.toLowerCase() === item.email.toLowerCase() ||
            user.name.toLowerCase() === item.name.toLowerCase()
        );

        return !!existingUser;
      })
    );
  }

  addUser(item: any): Observable<any> {
    return this.http.post<any>(this.userurl, item).pipe(
      tap((newUser: { id: any }) => {
        this.emailservice.sendEmail(
          'othermsg',
          item.email,
          item.name,
          'Learnix',
          'welcome to Learnix',
          'Welcome to Learnix. We hope you have an excellent learning journey with us.'
        );

        this.otherservices
          .showalert('success', 'Welcome to Learnix')
          .subscribe(res=>{
          });

        localStorage.setItem('users', JSON.stringify(newUser.id));
      })
    );
  }

  getuserbyid(id: String): Observable<any> {
    const url = `${this.userurl}/${id}`;
    return this.http.get<any>(url);
  }

  updateuser(userData: any): Observable<any> {
    const url = `${this.userurl}/${userData.id}`;
    const updatedUser = { ...userData };

    this.otherservices
      .showalert('success', 'Updated profile')
      .subscribe((result) => {});
    return this.http.put(url, updatedUser);
  }

  signout() {
    this.authStateSubject.next(false);
    this.store.dispatch(managerUserChange({ user: null }));
    localStorage.removeItem('users');
    this.otherservices
      .showalert('success', 'Signed out Succesfully')
      .subscribe((result) => {});
  }

  signin(user: any) {
    this.authStateSubject.next(true);
    this.store.dispatch(managerUserChange({ user }));
    // Save user to localStorage to persist authentication across reloads
    localStorage.setItem('users', JSON.stringify(user.id));

    this.emailservice.sendEmail(
      'othermsg',
      user.email,
      user.name,
      'Learnix',
      'Signed in to Learnix',
      'You just signed in to Learnix. If it was not you, please contact us immediately.'
    );
    this.otherservices
      .showalert('success', 'Signed in Succesfully')
      .subscribe((result) => {});
  }

  enrollToCourse(UserId: String, courseData: UserCourse): Observable<any> {
    return this.getuserbyid(UserId).pipe(
      switchMap((user) => {
        this.dataservice
          .getcoursebyid(courseData.id as string)
          .subscribe((cdata) => {
            this.emailservice.sendEmail(
              'othermsg',
              user.email,
              user.name,
              'Learnix',
              `Enrolled to ${cdata.courseName}`,
              `You just enrolled in the course ${cdata.courseName}, Happy learning!`
            );
            this.otherservices
              .showalert('success', 'Enrolled to Course')
              .subscribe((result) => {});
          });

        const url = `${this.userurl}/${UserId}`;
        return this.http.get<any>(url).pipe(
          switchMap((user) => {
            user.courses.push(courseData);
            return this.http.put<any>(url, user);
          })
        );
      })
    );
  }

  disableUser(id: String): Observable<any> {
    return this.getuserbyid(id).pipe(
      switchMap((user) => {
        this.emailservice.sendEmail(
          'othermsg',
          user.email,
          user.name,
          'Learnix',
          'Message from Learnix',
          'Your account has been removed from Learnix due to policy violations.'
        );
        user.disabled = 'true';
        const url = `${this.userurl}/${id}`;
        return this.http.put<any>(url, user);
      }),
      catchError((error) => {
        console.error('Error disabling user:', error);
        return of(null);
      })
    );
  }

  removeFromCourse(userID: string, courseID: String): Observable<any> {
    return this.getuserbyid(userID).pipe(
      switchMap((user) => {
        this.dataservice
          .getcoursebyid(courseID as string)
          .subscribe((cdata) => {
            this.emailservice.sendEmail(
              'othermsg',
              user.email,
              user.name,
              'Learnix',
              `Unenrolled from ${cdata.courseName}`,
              `You just unenrolled from the course ${cdata.courseName}, Let us upskill together.`
            );
          });

        const url = `${this.userurl}/${userID}`;
        const courseIndex = user.courses.findIndex(
          (course: UserCourse) => course.id === courseID
        );
        if (courseIndex !== -1) {
          user.courses.splice(courseIndex, 1);
        } else {
          console.error(
            `Course with ID ${courseID} not found in user's courses.`
          );
        }

        return this.http.put<any>(url, user);
      })
    );
  }


  removeuserfromcourse(userID: string, courseID: String): Observable<any> {
      return this.getuserbyid(userID).pipe(
        switchMap((user) => {
          const url = `${this.userurl}/${userID}`;
          const courseIndex = user.courses.findIndex(
            (course: UserCourse) => course.id === courseID
            );
            if (courseIndex !== -1) {
              user.courses.splice(courseIndex, 1);
            } else {
              console.error(
                `Course with ID ${courseID} not found in user's courses.`
                );
            }
            return this.http.put<any>(url, user);
            })
            );
  }

  removemessagefromuser(userID: string, messageID: string): Observable<any> {
    return this.getuserbyid(userID).pipe(
      switchMap((user) => {
        const url = `${this.userurl}/${userID}`;
        const messageIndex = user.messages.findIndex(
          (message: Comment) => message.id === messageID
        );

        if (messageIndex !== -1) {
          user.messages[messageIndex].deleted = true;
          console.log('Message disabled:', user.messages[messageIndex]);
        } else {
          console.error(`Message with ID ${messageID} not found in user's messages.`);
        }
          return this.http.put<any>(url, user);
      })
    );
  }

  markasread(userID: string, messageID: string): Observable<any> {
    return this.getuserbyid(userID).pipe(
      switchMap((user) => {
        const url = `${this.userurl}/${userID}`;
        const messageIndex = user.messages.findIndex(
          (message: Comment) => message.id === messageID
        );

        if (messageIndex !== -1) {
          user.messages[messageIndex].read = true;
          console.log('Message marked as read:', user.messages[messageIndex]);
        } else {
          console.error(`Message with ID ${messageID} not found in user's messages.`);
        }
          return this.http.put<any>(url, user);
      })
    );
  }

  replytomessage(userID: string,message:Comment){
  }

}
