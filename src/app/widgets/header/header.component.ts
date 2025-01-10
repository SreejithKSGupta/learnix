import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    title = `e-Learn`;
      homeLink = { path: '/home', label: 'Home' };
      aboutLink = { path: '/about', label: 'About' };
      contactLink = { path: '/contact', label: 'Contact' };
    }
