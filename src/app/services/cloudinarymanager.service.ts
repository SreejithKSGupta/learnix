import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CloudinarymanagerService {
  private cloudName = 'dhrye1aew';
  private uploadPreset = 'default';
  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    return this.http.post<any>(url, formData).pipe(
      map((response) => response.secure_url),
      catchError((error) => {
        console.error('Cloudinary upload error:', error);
        throw error;
      })
    );
  }


  deleteImage(publicId: string): Observable<boolean> {
    console.warn(
      'Warning: Deleting images requires the API Secret. Avoid exposing it on the frontend!'
    );
    return of(false);
  }
}
