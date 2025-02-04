import { Component, OnInit, OnDestroy } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../interfaces/users';
import { selectUserState } from '../../store/selectors/user.selector';

@Component({
  selector: 'app-navbar',
  standalone:false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  logordash: string | undefined;
  user$: Observable<User | null>;
  userSubscription: Subscription | undefined;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUserState);
  }

  ngOnInit() {
    this.userSubscription = this.user$.subscribe((user) => {
      if(user?.name){
        this.logordash='Dashboard';
      }
     else {
      this.logordash='Login';
     }
    });
  }



  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
}
