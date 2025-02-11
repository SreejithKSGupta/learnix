import { Component, OnInit } from '@angular/core';
import { Userservice } from './services/user.service';
import { ThemeService } from './services/theme.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'e-Learn';
  sparticles=false;
  constructor(private userservice:Userservice,    private themeService: ThemeService
  ){  }
  ngOnInit(): void {
    this.userservice.checkauthentication();
    this.themeService.getSettings().subscribe((settings) => {
      this.sparticles = settings.showparticles;
    });

  }

}
