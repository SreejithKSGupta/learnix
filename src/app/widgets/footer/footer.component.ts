import { OtherServices } from './../../services/otherservices.service';
import { AdmindataService } from './../../services/admindata.service';
import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  footertitle = 'Learnix';
  logo = '/learnixtplogo.webp';
 email: any;
  address: any;
  socialLinks: any;
  pages :any;
  socialicons: any;

  constructor(
    private emailService: EmailService,
    private admindataservice: AdmindataService,
    private otheservices: OtherServices
  ) {
    this.otheservices.getappdata().subscribe((data: any) => {
      this.footertitle = data.title;
      this.logo = data.logo;
      this.address = data.address;
      this.socialLinks = data.socials;
      this.pages=data.footernavlinks;
    });
  }



  subscribeToNewsletter() {
    if (this.email) {
      this.admindataservice.addtosubscribers(this.email).subscribe((res) => {
        console.log(res);
      });
      this.emailService
        .sendEmail('subscription', this.email)
        .then((response) => {
          console.log('Email sent successfully:', response);
          alert('Thank you for subscribing! A welcome email has been sent.');
          this.email = '';
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          alert('An error occurred while sending the email. Please try again.');
        });
    }
  }
}
