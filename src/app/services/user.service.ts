import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
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
    return this.http.put<any>(url, userData);
  }

  isauthenticated(): boolean {
    const userl = localStorage.getItem('user') || 'null';
    const user = JSON.parse(userl);
    return user !== null;
  }

  userrole(): string {
    const userl = localStorage.getItem('user') || 'null';
    const user = JSON.parse(userl);
    return user.usertype;
  }
}

