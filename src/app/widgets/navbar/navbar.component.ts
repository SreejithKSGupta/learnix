import { Component, OnInit, OnDestroy } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { Userservice } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  logordash: string | undefined;
  private authSubscription: Subscription = new Subscription();

  constructor(private userservice: Userservice) {}

  ngOnInit() {
    this.authSubscription = this.userservice.authState$.subscribe((isAuthenticated) => {
      this.logordash = isAuthenticated ? 'Dashboard' : 'Login';
    });
  }

  ngOnDestroy() {
    // Cleanup the subscription when the component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
}
