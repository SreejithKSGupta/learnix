import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-addcourse',
  standalone: false,
  
  templateUrl: './addcourse.component.html',
  styleUrl: './addcourse.component.css'
})
export class AddcourseComponent {
  title = 'Add New Courses';
  angForm!: FormGroup;
  constructor(private fb: FormBuilder) {
   this.createForm();
 }
  createForm() {
   this.angForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[A-Z,a-z ]+[A-Z,a-z,0-9 ]*$')]],
    author: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[A-Z,a-z ]*$')]],
    duration: ['', [Validators.required, Validators.pattern('^[0-9]*$'),Validators.max(12),Validators.min(4)]],
    credits: ['', [Validators.required, Validators.pattern('^[0-9]*$'),Validators.max(5),Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(10)]]
   });
 }
}
