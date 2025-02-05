import { Component } from '@angular/core';
import {Statistics} from '../../../interfaces/otherinterfaces'
import { OtherServices } from '../../../services/otherservices.service';
@Component({
  selector: 'app-statisticssection',
  standalone: false,

  templateUrl: './statisticssection.component.html',
  styleUrl: './statisticssection.component.css'
})

export class StatisticssectionComponent {




  statistics: any;
    constructor(private otherServices: OtherServices){
      this.otherServices.getappdata().subscribe((data:any)=>{
        this.statistics=data.stats;
      })
    }

}
