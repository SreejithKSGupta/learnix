import { Component } from '@angular/core';
import { User } from './user.interface';
@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public user!: User;

  ngOnInit() {
    this.user = {
      name: '',
      email: "",
      phone: 0,
      gender: "",
      courses: [],
      remarks: "",

    };
  }

  save(model: User, isValid: boolean) {

    console.log(model, isValid);
  }
}
