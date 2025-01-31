
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { managerUserChange } from '../../store/actions/user.action';
import { selectUserState } from '../../store/selectors/user.selector';


@Component({
  selector: 'app-userdata',
  standalone: false,

  templateUrl: './userdata.component.html',
  styleUrl: './userdata.component.css'
})
export class UserdataComponent {
  user$: Observable<any>;

  constructor(private store: Store) {
  this.user$ = this.store.select(selectUserState);
  }
  changeUser() {
    let positions = ["hello", "this", "something else", "totally different"];
      let randomPosition = positions[Math.floor(Math.random() * positions.length)];
      // this.store.dispatch(managerUserChange({ name: randomPosition }));
  }

}
