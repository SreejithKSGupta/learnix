
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { manageruserchange } from '../../store/actions/user.action';
import { selectUserState } from '../../store/selectors/user.selector';


@Component({
  selector: 'app-userdata',
  standalone: false,

  templateUrl: './userdata.component.html',
  styleUrl: './userdata.component.css'
})
export class UserdataComponent {
  hello$: Observable<string>;
  constructor(private store: Store) {
  this.hello$ = this.store.select(selectUserState);
  }
  sayHello() {
  this.store.dispatch(manageruserchange());
  }
}

