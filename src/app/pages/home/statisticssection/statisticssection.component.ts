import { Component } from '@angular/core';

@Component({
  selector: 'app-statisticssection',
  standalone: false,
  
  templateUrl: './statisticssection.component.html',
  styleUrl: './statisticssection.component.css'
})
export class StatisticssectionComponent {
  statistics = [
    [3000, "+ Hours worth of", " content"],
    [150, "+ World-class", " instructors"],
    [50, "+ Top quality", " Courses"],
    [2000, "+ Successful students", " Graduated"],
    [10, "+ Years of experience in", " online education"]
  ];
}
