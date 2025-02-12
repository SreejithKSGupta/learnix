import { Component } from '@angular/core';

@Component({
  selector: 'app-featurespage',
  standalone:false,
  templateUrl: './featurespage.component.html',
  styleUrls: ['./featurespage.component.css']
})
export class FeaturespageComponent {
  featureCategories = [
    {
      title: 'For Students',
      description: 'Features that enhance the learning experience for students.',
      features: [
        'Enroll in a wide range of courses',
        'Sign in to access your profile',
        'Track your progress with ease',
        'Upload and manage your profile picture',
        'Write and display blogs',
        'Subscribe to email updates'
      ],
      imageUrl: 'https://via.placeholder.com/600x400?text=Students'
    },
    {
      title: 'For Admins',
      description: 'Tools and functionalities designed for administrators.',
      features: [
        'Edit homepage data and layout',
        'Manage user statistics and activity',
        'Respond and manage user inquiries and course issues',
        'Send custom emails to subscribed users',
        'Manage subscriptions and email lists'
      ],
      imageUrl: 'https://via.placeholder.com/600x400?text=Admins'
    },
    {
      title: 'For Tutors',
      description: 'Features tailored to help tutors manage courses and students.',
      features: [
        'Upload and manage courses',
        'Set your course pricing',
        'Share courses with a wider audience',
        'Manage your own profile and course images'
      ],
      imageUrl: 'https://via.placeholder.com/600x400?text=Tutors'
    },
    {
      title: 'Done Features',
      description: 'Important features available across all user types.',
      features: [
        'Write and display blogs',
        'Subscribed user list management',
        'Sharable courses',
        'Admin can send custom emails to everyone on the email list',
        'OTP for sign-in and password recovery',
        'Profile editing features',
        'Editable homepage stats, testimonials, data, and social links'
      ],
      imageUrl: 'https://via.placeholder.com/600x400?text=Done+Features'
    }
  ];
}
