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
import { Comment } from './../interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  private authStateSubject = new BehaviorSubject<boolean>(false);
  public authState$ = this.authStateSubject.asObservable();
  user$!: Observable<any>;
  private userurl = 'http://localhost:3000/users';

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
    return this.http.get(this.userurl);
  }

  private updateUserData(userID: string, updateFn: (user: any) => void): Observable<any> {
    return this.getuserbyid(userID).pipe(
      switchMap((user) => {
        updateFn(user);
        this.store.dispatch(managerUserChange({ user }));
        return this.http.put<any>(`${this.userurl}/${userID}`, user);
      })
    );
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
      tap((newUser) => {
        this.sendUserEmail(item.email, item.name, 'Welcome to Learnix', 'We hope you have an excellent learning journey with us.');
        this.showSuccessAlert('Welcome to Learnix');
        localStorage.setItem('users', JSON.stringify(newUser.id));
      })
    );
  }

  getuserbyid(id: string): Observable<any> {
    return this.http.get<any>(`${this.userurl}/${id}`);
  }

  updateuser(userData: any): Observable<any> {
    this.showSuccessAlert('Updated profile');
    return this.http.put(`${this.userurl}/${userData.id}`, userData);
  }

  signout(): void {
    this.authStateSubject.next(false);
    this.store.dispatch(managerUserChange({ user: null }));
    localStorage.removeItem('users');
    this.showSuccessAlert('Signed out Successfully');
  }

  signin(user: any): void {
    this.authStateSubject.next(true);
    this.store.dispatch(managerUserChange({ user }));
    localStorage.setItem('users', JSON.stringify(user.id));
    this.sendUserEmail(user.email, user.name, 'Signed in to Learnix', 'If this was not you, please contact us immediately.');
    this.showSuccessAlert('Signed in Successfully');
  }

  enrollToCourse(UserId: string, courseData: UserCourse): Observable<any> {
    return this.updateUserData(UserId, (user) => {
      user.courses.push(courseData);
      this.dataservice.getcoursebyid(courseData.id as string).subscribe((cdata) => {
        this.sendUserEmail(user.email, user.name, `Enrolled to ${cdata.courseName}`, 'Happy learning!');
        this.showSuccessAlert('Enrolled to Course');
      });
    });
  }

  disableUser(id: string): Observable<any> {
    return this.updateUserData(id, (user) => {
      this.sendUserEmail(user.email, user.name, 'Message from Learnix', 'Your account has been removed due to policy violations.');
      user.disabled = true;
    }).pipe(catchError((error) => {
      console.error('Error disabling user:', error);
      return of(null);
    }));
  }

  removeFromCourse(userID: string, courseID: string): Observable<any> {
    return this.updateUserData(userID, (user) => {
      user.courses = user.courses.filter((course: UserCourse) => course.id !== courseID);
      this.dataservice.getcoursebyid(courseID).subscribe((cdata) => {
        this.sendUserEmail(user.email, user.name, `Unenrolled from ${cdata.courseName}`, 'Let us upskill together.');
      });
    });
  }

  removemessagefromuser(userID: string, messageID: string): Observable<any> {
    return this.updateUserData(userID, (user) => {
      const message = user.messages.find((msg: Comment) => msg.id === messageID);
      if (message) message.deleted = true;
    });
  }

  markasread(userID: string, messageID: string): Observable<any> {
    return this.updateUserData(userID, (user) => {
      const message = user.messages.find((msg: Comment) => msg.id === messageID);
      if (message) message.read = true;
    });
  }

  markallmsgsasread(userID: string): Observable<any> {
    return this.updateUserData(userID, (user) => {
      if (user.messages?.length) user.messages.forEach((msg: Comment) => (msg.read = true));
    });
  }

  private sendUserEmail(email: string, name: string, subject: string, message: string): void {
    this.emailservice.sendEmail('othermsg', email, name, 'Learnix', subject, message);
  }

  private showSuccessAlert(message: string): void {
    this.otherservices.showalert('success', message).subscribe();
  }
}
