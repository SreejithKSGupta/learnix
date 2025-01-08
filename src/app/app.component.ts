import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'welcome-project';
  homeLink = { path: '/home', label: 'Home' };
  aboutLink = { path: '/about', label: 'About' };
  contactLink = { path: '/contact', label: 'Contact' };
}
