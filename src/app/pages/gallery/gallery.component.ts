import { Component } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
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
  
private _albums: any[] = [];

constructor(private _lightbox: Lightbox) {
  this.galleryimgs.forEach((img) => {
    const album = {
      src: img,
      thumb: img
    };
    this._albums.push(album);
  });
}

openLightbox(index: number): void {
  console.log("clicked on index number :", index)
  this._lightbox.open(this._albums, index,{ wrapAround: true, showImageNumberLabel: true , centerVertically:true, fitImageInViewPort:true});
}

closeLightbox(): void {
  this._lightbox.close();
}
}


