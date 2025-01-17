import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  footertitle = 'learnix';
   logo = '/learnixtplogo.webp'
  footerDescription = 'Providing top-quality educational resources and online learning tools.';
  contactDetails = {
    address: '123 Learning St., Education City, ED 4567',
    email: 'support@elearn.com',
    phone: '+1 234 567 890'
  };
  socialLinks = [
    { platform: 'facebook', url: '#', icon: 'assets/icons/facebook.svg' },
    { platform: 'twitter', url: '#', icon: 'assets/icons/twitter.svg' },
    { platform: 'instagram', url: '#', icon: 'assets/icons/instagram.svg' },
    { platform: 'linkedin', url: '#', icon: 'assets/icons/linkedin.svg' }
  ];
}
