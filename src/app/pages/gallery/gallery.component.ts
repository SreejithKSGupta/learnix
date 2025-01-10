import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: false,
  
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  galleryimgs: string[] = [
    "assets/gallery/aunty.webp",
    "assets/gallery/boy1.webp",
    "assets/gallery/class.webp"
];
  

}
