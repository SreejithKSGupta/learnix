import { Comment } from './../interfaces/comment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';



@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/blogs';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blog);
  }

  updateBlog(id: number, blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiUrl}/${id}`, blog);
  }

  deleteBlog(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addcomment(blogdata:Blog, comment: Comment): Observable<Blog> {
      let blogurl = `${this.apiUrl}/${blogdata.id}`;
      return this.http.put<Blog>(blogurl, blogdata);
  }

}
