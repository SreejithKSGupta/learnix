import { Component } from '@angular/core';
import { OtherServices } from '../../../services/otherservices.service';
OtherServices
@Component({
  selector: 'app-faqpage',
  standalone: false,
  templateUrl: './faqpage.component.html',
  styleUrl: './faqpage.component.css'
})
export class FaqpageComponent {
  faqs:any;

  constructor(private otherServices: OtherServices){
    this.otherServices.getappdata().subscribe((data:any)=>{
      this.faqs=data.faqs;
    })
  }


}
