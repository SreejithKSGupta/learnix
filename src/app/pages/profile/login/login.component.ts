import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from '../../../interfaces/users';
import { Userservice } from '../../../services/user.service';

import { CloudinarymanagerService } from '../../../services/cloudinarymanager.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, firstValueFrom, Observable, tap, throwError } from 'rxjs';
import { selectUserState } from '../../../store/selectors/user.selector';
import { OtherServices } from '../../../services/otherservices.service';
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
  user$: Observable<User | null>;
  iseditmode:Boolean|undefined;
  currentuserdata!:User;


  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private userservice: Userservice,
    private cloudinaryService: CloudinarymanagerService,
    private route: ActivatedRoute,
    private store: Store,
    private otherservices:OtherServices

  ) {
        this.user$ = this.store.select(selectUserState);
  }

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
    this.route.queryParams.subscribe((params) => {
      const userId = params['id'];
      console.log(userId);

      if (userId) {
        this.iseditmode = true;
        this.userservice.getuserbyid(userId).subscribe((user) => {
          this.currentuserdata=user;
          this.populateForm(user);
        });
      }
    });

    this.firstFormGroup.get('userType')?.valueChanges.subscribe((userType) => {
      if (userType === 'tutor') {
        this.secondFormGroup
          .get('expertise')
          ?.setValidators([Validators.required]);
        this.secondFormGroup.get('areaOfInterest')?.clearValidators();
      } else if (userType === 'student') {
        this.secondFormGroup
          .get('areaOfInterest')
          ?.setValidators([Validators.required]);
        this.secondFormGroup.get('expertise')?.clearValidators();
      }
      this.secondFormGroup.get('expertise')?.updateValueAndValidity();
      this.secondFormGroup.get('areaOfInterest')?.updateValueAndValidity();
    });
  }

  populateForm(user: User) {
    // Populate the form with the user data
    this.firstFormGroup.patchValue({
      name: user.name,
      email: user.email,
      userType: user.userType,
    });

    this.secondFormGroup.patchValue({
      gender: user.gender,
      // expertise: user.expertise,
      areaOfInterest: user.areaOfInterest,
      experience: user.experience,
    });

    this.thirdFormGroup.patchValue({
      password: user.password,
      confirmPassword: user.password,
    });

    // Set the uploaded image if available
    this.uploadedimg = user.imageUrl;
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onImageSelected(file: File | null) {
    this.uploadedimg = file;
  }

  async submit() {
    if (!this.signupForm.valid) {
      this.otherservices.showalert('error', 'Please fill all required fields correctly');
      return;
    }

    try {
      // Create user object from form data, safely handling undefined currentuserdata
      const user: User = {
        // For new users, use Date.now(); for editing, use existing ID if available
        id: this.iseditmode ? this.currentuserdata?.id : String(Date.now()),

        // Default values for new users, preserve existing values when editing
        disabled: this.iseditmode ? (this.currentuserdata?.disabled ?? false) : false,

        // Form values with null checking
        name: this.firstFormGroup.get('name')?.value || '',
        userType: this.firstFormGroup.get('userType')?.value || '',
        gender: this.secondFormGroup.get('gender')?.value || '',
        email: this.firstFormGroup.get('email')?.value || '',
        areaOfInterest: this.secondFormGroup.get('areaOfInterest')?.value || [],
        experience: this.secondFormGroup.get('experience')?.value || '',
        password: this.thirdFormGroup.get('password')?.value || '',
        imageUrl: this.iseditmode ? (this.currentuserdata?.imageUrl) : '',
        courses: this.iseditmode ? (this.currentuserdata?.courses ?? []) : [],
        messages: this.iseditmode ? (this.currentuserdata?.messages ?? []) : [],
      };

      // Check if the user already exists for new user
      if (!this.iseditmode) {
         this.userservice.checkIfUserExists(user).subscribe(async res=>{
          if (res) {
            console.log('User already exists',res);
            this.router.navigate(['/signin']);
            this.otherservices.showalert('error', 'User already exists').subscribe(() => {
            });
            return;
          }
          else {

      // Validate required fields
      if (!user.name || !user.email || !user.password) {
        this.otherservices.showalert('error', 'Please fill all required fields');
        return;
      }

      // Handle image upload if present (only for new users or if the image was changed)
      if (this.uploadedimg && (!this.iseditmode || this.uploadedimg !== this.currentuserdata?.imageUrl)) {
        try {
          const imgurl = await firstValueFrom(
            this.cloudinaryService.uploadImage(this.uploadedimg)
          );
          user.imageUrl = imgurl;
        } catch (error) {
          console.error('Image upload failed:', error);
          this.otherservices.showalert('error', 'Failed to upload image. Please try again');
          return;
        }
      }

            // Handle edit mode vs new user
            if (this.iseditmode) {
              // Update existing user
              this.userservice.updateuser(user).pipe(
                tap((res) => {
                  console.log('User updated successfully:', res);
                  this.otherservices.showalert('success', 'Profile updated successfully');
                  this.router.navigate(['/dashboard']);
                }),
                catchError((error) => {
                  console.error('Update failed:', error);
                  this.otherservices.showalert('error', 'Failed to update profile');
                  return throwError(() => error);
                })
              ).subscribe();
            } else {
              // Add new user
              this.userservice.addUser(user).pipe(
                tap((res) => {
                  console.log('User created successfully:', res);
                  this.userservice.signin(user);
                  this.otherservices.showalert('success', 'Sign-up successful! Welcome to our platform');
                }),
                catchError((error) => {
                  console.error('Sign-up failed:', error);
                  let errorMessage = 'Sign-up failed. Please try again';
                  if (error.message?.includes('already exists')) {
                    errorMessage = error.message;
                  }
                  this.otherservices.showalert('error', errorMessage);
                  return throwError(() => error);
                })
              ).subscribe();
            }

          }
        });

      }


    } catch (error) {
      console.error('Form submission error:', error);
      this.otherservices.showalert('error', 'An unexpected error occurred');
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
