import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service'; // Adjust the path if needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcourse',
  standalone: false,
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent {
  title = 'Add New Courses';
  angForm!: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Z,a-z ]+[A-Z,a-z,0-9 ]*$')]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Z,a-z ]*$')]],
      duration: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(12), Validators.min(4)]],
      credits: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(5), Validators.min(1)]],
      coursefee: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(5000), Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.angForm.valid) {
      const courseData = {
        courseName: this.angForm.value.name,
        tutor: this.angForm.value.author,
        duration: this.angForm.value.duration,
        description: this.angForm.value.description,
        importantTechnologiesUsed: [],
        courseFee: this.angForm.value.coursefee,
        credits: this.angForm.value.credits
      };

      this.dataService.addcourse(courseData).subscribe(
        (response) => {
          console.log('Course added successfully:', response);
          alert('Course added successfully!');
          this.router.navigate(['/courses']);
        },
        (error) => {
          console.error('Error adding course:', error);
          alert('Failed to add course. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
