import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';

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

  removeuser(id: string): Observable<any> {
    const url = `${this.userurl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError((error) => {
        return of(null);
      })
    );
  }

  getuserbyid(id: string): Observable<any> {
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
}
