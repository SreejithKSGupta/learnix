import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-herosection',
  standalone:false,
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.css'],
})
export class HerosectionComponent implements OnInit {
  
  ngOnInit(): void {
    // Optionally, you can initialize some values or features on component load
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset; // Get the current scroll position
    const parallax = document.querySelector('.hero-left') as HTMLElement;
    const parallaxImg=document.querySelector('.hero-right') as HTMLElement;
    
    if (parallax) {
      parallax.style.transform = `translate(${scrollPosition * -0.3}px, ${scrollPosition * -0.1}px)`;
    }
    if (parallaxImg) {
      parallaxImg.style.transform = `translate(${scrollPosition * 0.3}px, ${scrollPosition * -0.1}px)`; 
    }
  }
}
