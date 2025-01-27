import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CloudinarymanagerService {
  private cloudName = 'dhrye1aew'; // Your Cloudinary cloud name
  private uploadPreset = 'default'; // Your upload preset

  constructor(private http: HttpClient) {}

  /**
   * Uploads an image to Cloudinary
   * @param file - File to upload
   * @returns Observable<string> - The uploaded image's secure URL
   */
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

  /**
   * Deletes an image from Cloudinary
   * @param publicId - The public ID of the image to delete
   * @returns Observable<boolean> - True if deletion was successful
   */
  deleteImage(publicId: string): Observable<boolean> {
    // Replace this with a call to your backend to securely handle the delete API
    console.warn(
      'Warning: Deleting images requires the API Secret. Avoid exposing it on the frontend!'
    );
    return of(false);
  }
}
