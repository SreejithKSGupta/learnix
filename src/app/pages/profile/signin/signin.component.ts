import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userservice } from '../../../services/user.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: Userservice,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.signinForm = this.fb.group({
      nameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.userService.getusers().subscribe((users) => {
        const user = users.find(
          (u: any) =>
            (u.name === this.signinForm.value.nameOrEmail ||
              u.email === this.signinForm.value.nameOrEmail) &&
            u.password === this.signinForm.value.password
        );
        if (user) {
          this.userService.signin(user);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid name/email or password';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields';
    }
  }
}

