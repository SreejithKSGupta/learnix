import { Component } from '@angular/core';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
}
