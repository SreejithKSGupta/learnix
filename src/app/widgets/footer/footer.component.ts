import { AdmindataService } from './../../services/admindata.service';
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
    { name: 'Home', url: '#' },
    { name: 'Privacy Policy', url: 'privacy' },
    { name: 'About Us', url: 'about' },
    { name: 'Courses', url: 'courses' },
    { name: 'Blog', url: 'blogs' }
  ];
  email = '';

  constructor(private emailService: EmailService,private admindataservice :AdmindataService) {}

  subscribeToNewsletter() {
    if (this.email) {
      this.admindataservice.addtosubscribers(this.email).subscribe(res=>{
        console.log(res);
      })
      this.emailService.sendEmail('subscription', this.email).then(response => {
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
