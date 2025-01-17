import { User } from './user.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  signupForm!: FormGroup;  // Parent form group
  firstFormGroup!: FormGroup;  // Step 1
  secondFormGroup!: FormGroup;  // Step 2
  thirdFormGroup!: FormGroup;   // Step 3

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    // Initialize the first form group for step 1
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required]
    });

    // Initialize the second form group for step 2
    this.secondFormGroup = this._formBuilder.group({
      gender: ['', Validators.required],
      expertise: [''],
      areaOfInterest: [''],
      experience: ['', Validators.required]
    });

    // Initialize the third form group for step 3
    this.thirdFormGroup = this._formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );

    // Initialize the parent form
    this.signupForm = this._formBuilder.group({
      firstFormGroup: this.firstFormGroup,
      secondFormGroup: this.secondFormGroup,
      thirdFormGroup: this.thirdFormGroup
    });
  }

  // Password match validation
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // You can use this method to submit the form
  submit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
    }
  }
}
