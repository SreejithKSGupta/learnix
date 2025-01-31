import { Component, OnInit, OnDestroy } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { Userservice } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/users';
import { selectUserState } from '../../store/selectors/user.selector';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logordash: string | undefined;
  user$: Observable<User | null>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUserState);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      this.logordash = user?.name ? 'Dashboard' : 'Login';
    });
  }

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
}
