import { OtherServices } from './../../../services/otherservices.service';
import { EmailService } from './../../../services/email.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userservice } from '../../../services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  standalone:false
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  otpForm: FormGroup;
  passwordResetForm: FormGroup;

  currentStep: number = 1;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  user: any = null;
  otp: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: Userservice,
    private router: Router,
    private emailService: EmailService,
    private otherService: OtherServices
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
          otp: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
    });

    this.passwordResetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup) {
    if (formGroup.get('newPassword')?.value !== formGroup.get('confirmPassword')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  onEmailSubmit(): void {
    const { email } = this.forgotPasswordForm.value;

    this.userService.getusers().subscribe(
      (users) => {
        this.user = users.find((u: any) => u.email === email);

        if (this.user) {
          this.currentStep = 2;
          this.errorMessage = null;
          this.successMessage = null;
          this.otp = Math.floor(1000 + Math.random() * 9000).toString();
          this.emailService
      .sendEmail(
        'otp',
        'sreejithksgupta2255@gmail.com',
        'Sreejith KS',
        'Learner',
        'Learnix replied',
        ` Your OTP is ${this.otp}, please do not share it with anyone. if you did not request this, please ignore this email. `
      )
      .then((response) => {
        this.otherService.showalert('success', 'OTP sent to your email succesfully').subscribe((result) => {});
      })
      .catch((error) => {
        this.otherService.showalert('info', 'Unble to send otp at the moment').subscribe((result) => {});
      });


        } else {
          this.errorMessage = 'No account found with that email address.';
          this.successMessage = null;
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while processing your request. Please try again.';
        this.successMessage = null;
      }
    );
  }

  onOtpSubmit(): void {
    const { otp } = this.otpForm.value;

    if (otp === this.otp) {
      this.currentStep = 3;
      this.errorMessage = null;
      this.successMessage = null;
    } else {
      this.errorMessage = 'Invalid OTP. Please try again.';
      this.successMessage = null;
    }
  }

  onPasswordResetSubmit(): void {
    if (this.passwordResetForm.valid) {
      const { newPassword } = this.passwordResetForm.value;

      this.user.password = newPassword;

      this.userService.updateuser(this.user).subscribe(
        (response) => {
          this.successMessage = 'Your password has been successfully updated.';
          this.errorMessage = null;
          this.currentStep = 1;
          this.forgotPasswordForm.reset();
          this.otpForm.reset();
          this.passwordResetForm.reset();
          this.router.navigate(['/signin']);
        },
        (error) => {
          this.errorMessage = 'An error occurred while resetting your password. Please try again.';
          this.successMessage = null;
        }
      );
    } else {
      this.errorMessage = 'Please ensure all fields are valid.';
      this.successMessage = null;
    }
  }
}
