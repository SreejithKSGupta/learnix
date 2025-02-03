import { Component } from '@angular/core';
import {Statistics} from '../../../interfaces/otherinterfaces'
@Component({
  selector: 'app-statisticssection',
  standalone: false,

  templateUrl: './statisticssection.component.html',
  styleUrl: './statisticssection.component.css'
})

export class StatisticssectionComponent {




  statistics: Statistics[] = [
    { value: 3000, prefix: "+ Hours worth of", description: " content" },
    { value: 150, prefix: "+ World-class", description: " instructors" },
    { value: 50, prefix: "+ Top quality", description: " Courses" },
    { value: 2000, prefix: "+ Successful students", description: " Graduated" },
    { value: 10, prefix: "+ Years of experience in", description: " online education" }
  ];

}
