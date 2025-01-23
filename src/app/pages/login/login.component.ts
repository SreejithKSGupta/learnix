import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../../interfaces/users';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corrected property name from `styleUrl` to `styleUrls`
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup; // Parent form group for the stepper
  firstFormGroup!: FormGroup; // Step 1 form group
  secondFormGroup!: FormGroup; // Step 2 form group
  thirdFormGroup!: FormGroup; // Step 3 form group

  constructor(private _formBuilder: FormBuilder, private router: Router) {} // Injected Router for navigation

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      gender: ['', Validators.required],
      expertise: [''], // Conditional validation
      areaOfInterest: [''], // Conditional validation
      experience: ['', [Validators.required, Validators.min(0)]],
    });

    this.thirdFormGroup = this._formBuilder.group(
      {
        password: [
          '',
          [Validators.required, Validators.minLength(6)],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    this.signupForm = this._formBuilder.group({
      firstFormGroup: this.firstFormGroup,
      secondFormGroup: this.secondFormGroup,
      thirdFormGroup: this.thirdFormGroup,
    });

    // Set dynamic validation for expertise and areaOfInterest
    this.firstFormGroup.get('userType')?.valueChanges.subscribe((userType) => {
      if (userType === 'tutor') {
        this.secondFormGroup.get('expertise')?.setValidators([Validators.required]);
        this.secondFormGroup.get('areaOfInterest')?.clearValidators();
      } else if (userType === 'student') {
        this.secondFormGroup.get('areaOfInterest')?.setValidators([Validators.required]);
        this.secondFormGroup.get('expertise')?.clearValidators();
      }
      this.secondFormGroup.get('expertise')?.updateValueAndValidity();
      this.secondFormGroup.get('areaOfInterest')?.updateValueAndValidity();
    });
  }

  // Custom Validator for Password Matching
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  submit() {
    // Check if the signupForm is valid
    if (this.signupForm.valid) {
      // Create a `Users` object by extracting values from the form groups
      const user: Users = {
        id: Date.now(), // Example: Use timestamp as a unique ID
        name: this.firstFormGroup.get('name')?.value,
        usertype: this.firstFormGroup.get('userType')?.value,
        gender: this.secondFormGroup.get('gender')?.value,
        email: this.firstFormGroup.get('email')?.value,
        areaOfInterest: this.secondFormGroup.get('areaOfInterest')?.value || [],
        experience: this.secondFormGroup.get('experience')?.value,
        password: this.thirdFormGroup.get('password')?.value,
      };

      // Log the user object to the console
      console.log('User data submitted successfully:', user);

      // Optionally navigate to a different page or display a success message
      // For this case, skip the last page and directly log success
      alert('Sign-up successful! Check the console for user data.');

      // Uncomment this to navigate to another page if needed
      // this.router.navigate(['/profile']);
    } else {
      console.log('Form is invalid. Please fill all required fields.');
      alert('Form is invalid. Please fill all required fields.');
    }
  }


  // Navigation function
  navigateToProfile() {
    console.log('Navigating to profile page...');
    this.router.navigate(['/profile']); // Adjust the route based on your application
  }

  // Utility function to dynamically check if the user is a tutor
  get isTutor(): boolean {
    return this.firstFormGroup.get('userType')?.value === 'tutor';
  }

  // Utility function to dynamically check if the user is a student
  get isStudent(): boolean {
    return this.firstFormGroup.get('userType')?.value === 'student';
  }
}
