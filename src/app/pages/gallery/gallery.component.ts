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
    "assets/gallery/class.webp",
    "assets/gallery/designer.webp",
    "assets/gallery/download.webp",
    "assets/gallery/girl2.webp",
    "assets/gallery/hero.webp",
    "assets/gallery/image.webp",
    "assets/gallery/team1.webp",

];
  

}
