import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-footer',
  standalone:false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
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

  constructor(private emailService: EmailService) {}

  subscribeToNewsletter() {
    if (this.email) {
      this.emailService.sendEmail(this.email)
        .then(response => {
          console.log('Email sent successfully:', response);
          alert('Thank you for subscribing! A welcome email has been sent.');
          this.email = '';
        })
        .catch(error => {
          console.error('Failed to send email:', error);
          alert('An error occurred while sending the email. Please try again.');
        });
    }
  }
}
