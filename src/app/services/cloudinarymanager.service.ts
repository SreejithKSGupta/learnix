import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import imageCompression from 'browser-image-compression';


@Injectable({
  providedIn: 'root',
})
export class CloudinarymanagerService {
  private cloudName = 'dhrye1aew';
  private uploadPreset = 'default';
  constructor(private http: HttpClient) {}


  async compressImage(file: File): Promise<File> {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 540,
      fileType: 'image/webp',
    };

    try {
      let useridd = JSON.parse(localStorage.getItem('users') || 'null');
      if (!useridd) {
           useridd='unauthenticated';
      }

      const fname = file.name;
      const compressedFile = await imageCompression(file, options);

      // Create a new File with the desired name
      const newFile = new File([compressedFile], `${fname}-${useridd}.webp`, {
        type: 'image/webp',
      });

      return newFile;
    } catch (error) {
      console.error('Error during image compression:', error);
      throw error;
    }
  }



  uploadImage(file: File): Observable<string> {
    return new Observable((observer) => {
      this.compressImage(file).then((compressedFile) => {

        const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
        console.log(`Cloudinary uploading file ${file.name} to ${url}`);

        const formData = new FormData();
        formData.append('file', compressedFile);
        console.log()
        formData.append('upload_preset', this.uploadPreset);

        this.http.post<any>(url, formData).pipe(
          map((response) => response.secure_url),
          catchError((error) => {
            console.error('Cloudinary upload error:', error);
            observer.error(error);
            return [];
          })
        ).subscribe(
          (url) => {
            observer.next(url);
            observer.complete();
          },
          (error) => observer.error(error)
        );
      }).catch((error) => {
        console.error('Image compression failed:', error);
        observer.error(error);
      });
    });
  }
}
