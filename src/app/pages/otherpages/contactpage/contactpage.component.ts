import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtherServices } from '../../../services/otherservices.service';
import { Userservice } from '../../../services/user.service';
import { ContactMessage } from '../../../interfaces/contactmsg';
@Component({
  selector: 'app-contact-us',
  standalone:false,
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  severityOptions: string[] = ['Low', 'Medium', 'High'];
  typeOptions: string[] = ['General Inquiry', 'Support', 'Feedback'];
  issignedin: boolean = false;
  user: any;
  constructor(private fb: FormBuilder, private otherServices: OtherServices, private router :Router, private userservice:Userservice) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      severity: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.issignedin = this.userservice.isauthenticated();
    // get and fill details of the user if signed in
    if (this.userservice.isauthenticated()) {
      const userl = localStorage.getItem('user');
      if (userl) {
        const userId = JSON.parse(userl).id;

        this.userservice.getuserbyid(userId).subscribe({
          next: (userData) => {
            this.user = userData;
            this.contactForm.patchValue({
              name: this.user.name,
              email: this.user.email,
            });
            // disable editing those fields
            this.contactForm.get('name')?.disable();
            this.contactForm.get('email')?.disable();
          },
          error: (err) => {
            console.error('Error fetching user data:', err);
          }
        });
      }
    }



  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    const contactData = this.contactForm.getRawValue();
    let message:ContactMessage=contactData;
    if(this.user){
      message.senderID=this.user.id;
    }

    // Use the service to send data to the JSON Server
    this.otherServices.submitContactForm(message).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        // You can show a success message or redirect here
        this.contactForm.reset();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        // You can show an error message here
      }
    });
  }

  get formControls() {
    return this.contactForm.controls;
  }
}
