import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/users';
import { Userservice } from '../../../services/user.service';
import { CloudinarymanagerService } from '../../../services/cloudinarymanager.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  uploadedimg: any;

  constructor(private _formBuilder: FormBuilder, private router: Router, private userservice: Userservice , private cloudinaryService:CloudinarymanagerService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      gender: ['', Validators.required],
      expertise: [''],
      areaOfInterest: [''],
      experience: ['', [Validators.required, Validators.min(0)]],
    });

    this.thirdFormGroup = this._formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    this.signupForm = this._formBuilder.group({
      firstFormGroup: this.firstFormGroup,
      secondFormGroup: this.secondFormGroup,
      thirdFormGroup: this.thirdFormGroup,
    });

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

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onImageSelected(file: File | null) {
     this.uploadedimg=file
  }

  submit() {
    if (this.signupForm.valid) {
      if (this.uploadedimg) {
        this.cloudinaryService.uploadImage(this.uploadedimg).subscribe(
          (imgurl) => {
            const user: User = {
              id: String(Date.now()),
              disabled:false,
              name: this.firstFormGroup.get('name')?.value,
              userType: this.firstFormGroup.get('userType')?.value,
              gender: this.secondFormGroup.get('gender')?.value,
              email: this.firstFormGroup.get('email')?.value,
              areaOfInterest: this.secondFormGroup.get('areaOfInterest')?.value || [],
              experience: this.secondFormGroup.get('experience')?.value,
              password: this.thirdFormGroup.get('password')?.value,
              imageUrl: imgurl!,
              courses:[],
              messages:[]
            };
            this.userservice.adduser(user).subscribe((res) => {
              console.log('User data submitted successfully:', res);
              this.userservice.signin(user);
            });

            alert('Sign-up successful! Check the console for user data.');
          },
          (error) => {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
          }
        );
      }



    } else {
      console.log('Form is invalid. Please fill all required fields.');
      alert('Form is invalid. Please fill all required fields.');
    }
  }

  navigateToProfile() {
    console.log('Navigating to profile page...');
    this.router.navigate(['/dashboard']);
  }

  get isTutor(): boolean {
    return this.firstFormGroup.get('userType')?.value === 'tutor';
  }
  get isStudent(): boolean {
    return this.firstFormGroup.get('userType')?.value === 'student';
  }
}
