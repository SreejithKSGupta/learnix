import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userservice } from '../../../services/user.service';
import { EmailService } from './../../../services/email.service';
import { OtherServices } from './../../../services/otherservices.service';

@Component({
  selector: 'app-signin',
  standalone:false,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  otpSent = false;
  optshow=false;
  otp: string = '';
  showsignin=false;
  errorMessage: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: Userservice,
    private router: Router,
    private emailService: EmailService,
    private otherService: OtherServices
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      otp: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    });
  }

  // Check if email exists in users and enable Send OTP button
  onEmailChange() {
    if (this.signinForm.get('email')?.valid) {
      this.optshow = true;
    } else {
      this.optshow = false;
    }
  }

  // Send OTP when button clicked
  sendOtp() {
    if (this.signinForm.get('email')?.valid) {
      const email = this.signinForm.get('email')?.value;
      this.otp = Math.floor(1000 + Math.random() * 9000).toString();

      // Send OTP email to the user
      this.emailService
        .sendEmail(
          'otp',
          email,
          'Sreejith KS',
          'Learner',
          'Learnix replied',
          `Your OTP is ${this.otp}. Please do not share it with anyone.`
        )
        .then(() => {
          this.otherService
            .showalert('success', 'OTP sent to your email successfully')
            .subscribe();
            this.showsignin = true;
            this.optshow = false;
            this.otpSent = true;
        })
        .catch(() => {
          this.otherService
            .showalert('error', 'Unable to send OTP at the moment')
            .subscribe();
            this.optshow = true;
            this.otpSent = false;
        });
    }
  }

  // Submit form after OTP entered
  onSubmit() {
    if (this.signinForm.valid) {
      const { email, password, otp } = this.signinForm.value;

      // Simulate user verification (check password and OTP)
      this.userService.getusers().subscribe((users) => {
        const user = users.find(
          (u: any) =>
            (u.email === email || u.name === email) &&
            u.password === password
        );
        if (user && otp === this.otp) {
          this.userService.signin(user);
          console.log("login successfull for user", user);

          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid credentials or OTP';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields';
    }
  }
}
