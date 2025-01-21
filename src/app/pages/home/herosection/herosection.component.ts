import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-herosection',
  standalone:false,
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.css'],
})
export class HerosectionComponent implements OnInit {
  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    const leftContent = document.querySelector('.hero-left') as HTMLElement;
    const rightContent = document.querySelector('.hero-right') as HTMLElement;

    if (leftContent) {
      leftContent.style.transform = `translateY(${scrollPosition * -0.2}px)`;
    }

    if (rightContent) {
      rightContent.style.transform = `translateY(${scrollPosition * -0.2}px)`;
    }
  }
}
