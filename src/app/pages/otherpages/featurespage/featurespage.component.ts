import { Component } from '@angular/core';

@Component({
  selector: 'app-featurespage',
  standalone: false,
  templateUrl: './featurespage.component.html',
  styleUrls: ['./featurespage.component.css']
})
export class FeaturespageComponent {
  featureCategories = [
    {
      title: 'General Features',
      description: 'Features Common for users in the website.',
      features: [
        'Profile with ability to add/edit details',
        'Profile Image',
        'Read Blog'
              ],
      imageUrl: 'https://via.placeholder.com/600x400?text=Students'
    },
  ];
}
