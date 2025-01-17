import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  footertitle = 'Learnix';
  logo = '/learnixtplogo.webp';
  footerDescription = 'Providing top-quality educational resources and online learning tools.';
  contactDetails = {
    address: '123 Learning St., Education City, ED 4567',
    email: 'support@elearn.com',
    phone: '+1 234 567 890'
  };
  socialLinks = [
    { platform: 'Facebook', url: '#', icon: '/assets/icons/facebook.svg' },
    { platform: 'Twitter', url: '#', icon: '/assets/icons/twitter.svg' },
    { platform: 'Instagram', url: '#', icon: '/assets/icons/instagram.svg' },
    { platform: 'LinkedIn', url: '#', icon: '/assets/icons/linkedin.svg' }
  ];
  pages = [
    { name: 'Privacy Policy', url: '#' },
    { name: 'About Us', url: '#' },
    { name: 'Home', url: '#' },
    { name: 'Courses', url: '#' },
    { name: 'Tutors/Students Portal', url: '#' },
    { name: 'Help and Support', url: '#' },
    { name: 'Blog', url: '#' }
  ];
  email = '';

  subscribeToNewsletter() {
    if (this.email) {
      console.log(`Subscribed with email: ${this.email}`);
      alert('Thank you for subscribing!');
      this.email = ''; // Clear the input field
    }
  }
}
