import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userservice } from '../../../services/user.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  // signinForm: FormGroup;
  // errorMessage: string | null = null;

  // constructor(
  //   private fb: FormBuilder,
  //   private userService: Userservice,
  //   private router: Router
  // ) {
  //   this.signinForm = this.fb.group({
  //     nameOrEmail: ['', [Validators.required]],
  //     password: ['', [Validators.required, Validators.minLength(6)]]
  //   });
  // }

  // ngOnInit(): void {}

  // onSubmit(): void {
  //   if (this.signinForm.valid) {
  //     const { nameOrEmail, password } = this.signinForm.value;
  //     this.userService.getusers().subscribe(
  //       (users) => {
  //         const user = users.find((u: any) => (u.name === nameOrEmail || u.email === nameOrEmail) && u.password === password);

  //         if (user) {
  //           localStorage.setItem('user', JSON.stringify(user));
  //           this.router.navigate(['/dashboard']);
  //         } else {
  //           this.errorMessage = 'Invalid name/email or password. Please try again.';
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching users:', error);
  //         this.errorMessage = 'An error occurred';
  //       }
  //     );
  //   } else {
  //     this.errorMessage = 'Please fill in all required fields';
  //   }
  // }
}
