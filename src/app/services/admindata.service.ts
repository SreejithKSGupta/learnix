// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { catchError, map } from 'rxjs/operators';
// import { Observable, of } from 'rxjs';
// import { Userservice } from './user.service';
// import { Messages } from '../interfaces/users';
// import { DataService } from './data.service';
// @Injectable({
//   providedIn: 'root'
// })
// export class AdmindataService {

//   constructor(private userservices:Userservice,private dataservices:DataService) { }

//   replytomail(uid:String,message:Messages){
//     const url = `${this.userurl}/${UserId}`;
//     return this.http.get<any>(url).pipe(
//       switchMap((user) => {
//         user.courses.push(courseData);
//         return this.http.put<any>(url, user);
//       })
//     );
//   }

// }
