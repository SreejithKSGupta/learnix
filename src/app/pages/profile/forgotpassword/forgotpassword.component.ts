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

  currentStep: number = 1;  // Track the current step (1 = Email, 2 = OTP, 3 = Password Reset)

  errorMessage: string | null = null;
  successMessage: string | null = null;

  user: any = null;  // Will store the user object after email verification
  otp: string = '1234';  // The fixed OTP for this implementation

  constructor(
    private fb: FormBuilder,
    private userService: Userservice,
    private router: Router
  ) {
    // Email Input Form
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // OTP Verification Form
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('1234')]]  // Only '1234' is valid
    });

    // Password Reset Form
    this.passwordResetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

  // Validator to check if both new password and confirm password match
  passwordMatchValidator(formGroup: FormGroup) {
    if (formGroup.get('newPassword')?.value !== formGroup.get('confirmPassword')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  // Step 1: Email Input
  onEmailSubmit(): void {
    const { email } = this.forgotPasswordForm.value;

    this.userService.getusers().subscribe(
      (users) => {
        this.user = users.find((u: any) => u.email === email);

        if (this.user) {
          this.currentStep = 2;  // Show OTP input
          this.errorMessage = null;
          this.successMessage = null;
        } else {
          this.errorMessage = 'No account found with that email address.';
          this.successMessage = null;
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'An error occurred while processing your request. Please try again.';
        this.successMessage = null;
      }
    );
  }

  // Step 2: OTP Verification
  onOtpSubmit(): void {
    const { otp } = this.otpForm.value;

    if (otp === this.otp) {
      this.currentStep = 3;  // Show password reset input
      this.errorMessage = null;
      this.successMessage = null;
    } else {
      this.errorMessage = 'Invalid OTP. Please try again.';
      this.successMessage = null;
    }
  }

  // Step 3: Password Reset
  onPasswordResetSubmit(): void {
    if (this.passwordResetForm.valid) {
      const { newPassword } = this.passwordResetForm.value;

      // Update the user password in the data
      this.user.password = newPassword;
      console.log('Updating user:', this.user);

      this.userService.updateuser(this.user).subscribe(
        (response) => {
          console.log('User updated:', response);
          this.successMessage = 'Your password has been successfully updated.';
          this.errorMessage = null;
          this.currentStep = 1;
          this.forgotPasswordForm.reset();
          this.otpForm.reset();
          this.passwordResetForm.reset();
          this.router.navigate(['/signin']);
        },
        (error) => {
          console.error('Error updating user:', error);
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
