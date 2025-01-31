import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtherServices } from '../../../services/otherservices.service';
import { Userservice } from '../../../services/user.service';
import { ContactMessage } from '../../../interfaces/contactmsg';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  standalone: false,
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  severityOptions: string[] = ['Low', 'Medium', 'High'];
  typeOptions: string[] = ['General Inquiry', 'Support', 'Feedback'];
  user$: Observable<any>; // Define the user$ observable

  constructor(
    private fb: FormBuilder,
    private otherServices: OtherServices,
    private router: Router,
    private userservice: Userservice
  ) {
    this.user$ = this.userservice.user$; // Assuming user$ is defined in the user service
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      severity: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.user$.subscribe(user => {
      if (user?.name) {
        this.contactForm.patchValue({
          name: user.name,
          email: user.email,
        });
        // Disable editing of the name and email fields
        this.contactForm.get('name')?.disable();
        this.contactForm.get('email')?.disable();
      }
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    const contactData = this.contactForm.getRawValue();
    let message: ContactMessage = contactData;

    // Check if the user is signed in and add senderID if present
    this.user$.subscribe(user => {
      if (user?.id) {
        message.senderID = user.id;
      }
    });

    // Use the service to send data to the backend
    this.otherServices.submitContactForm(message).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        // Show success message or redirect
        this.contactForm.reset();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        // Show error message
      }
    });
  }

  get formControls() {
    return this.contactForm.controls;
  }
}
