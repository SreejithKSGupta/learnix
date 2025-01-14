import { Component } from '@angular/core';

@Component({
  selector: 'app-samplelist',
  standalone: false,
  
  templateUrl: './samplelist.component.html',
  styleUrl: './samplelist.component.css'
})
export class SamplelistComponent {
  people: any[] = [
    {
      "name": "Douglas  Pace",
      "age": 35,
      "country": 'MARS'
    },
    {
      "name": "Mcleod  Mueller",
      "age": 32,
      "country": 'USA'
    },
    {
      "name": "Tim  crook",
      "age": 68,
      "country": 'UK'
    },
   {
      "name": "Cook  Tyson",
      "age": 32,
      "country": 'HK'
    }
  ];
}
