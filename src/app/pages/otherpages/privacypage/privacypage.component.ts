import { Component } from '@angular/core';

@Component({
  selector: 'app-privacypage',
  standalone: false,
  templateUrl: './privacypage.component.html',
  styleUrls: ['./privacypage.component.css']
})
export class PrivacypageComponent {
  privacyPolicy = {
    title: 'Privacy Policy',
    introduction: 'Your privacy is important to us. This Privacy Policy explains how Learnix collects, uses, and protects your personal information.',
    sections: [
      {
        title: '1. Information We Collect',
        content: 'We collect basic user details such as name, email, and course activity to enhance your learning experience. Additionally, we may collect browsing data and user preferences to personalize your experience further.'
      },
      {
        title: '2. How We Use Your Information',
        content: 'The information collected is used for platform improvements, user support, and personalized course recommendations. We may also use your data to communicate updates, promotional offers, and important notifications related to Learnix.'
      },
      {
        title: '3. Data Security',
        content: 'We implement robust security measures to protect your personal information from unauthorized access, disclosure, or alteration. Our security protocols include encryption, secure data storage, and regular security audits.'
      },
      {
        title: '7. Your Rights & Control Over Data',
        content: 'As a Learnix user, you have the right to access, modify, or delete your personal data at any time. Additionally, you can opt out of promotional emails and control privacy settings from your account dashboard.'
      },
      {
        title: '8. Changes to This Policy',
        content: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page, and significant updates will be communicated via email or platform notifications.'
      }
    ],
    contact: {
      title: '9. Contact Us',
      text: 'If you have any questions about this Privacy Policy, please contact us at',
      email: 'support@learnix.com'
    }
  };
}
