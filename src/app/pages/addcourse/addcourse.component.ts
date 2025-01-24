import { Course } from './../../interfaces/course';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';

@Component({
  selector: 'app-addcourse',
  standalone: false,
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})




export class AddcourseComponent implements OnInit {
  title = 'Add New Courses';
  angForm!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;
  isEditMode = false;
  updatableid: any;
  ischanged = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const courseId = params['id'];
      if (courseId) {
        this.isEditMode = true;
        this.updatableid= courseId;
        this.populateForm(courseId);
      }
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Z,a-z ]+[A-Z,a-z,0-9 ]*$')]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Z,a-z ]*$')]],
      duration: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(12), Validators.min(4)]],
      credits: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(5), Validators.min(1)]],
      coursefee: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(5000), Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      importantTechnologiesUsed: [[]]
    });
  }

  populateForm(courseId: string): void {
    this.dataService.getcoursebyid(courseId).subscribe(
      (course) => {
        this.angForm.patchValue({
          name: course.courseName,
          author: course.tutor,
          duration: course.duration,
          credits: course.credits,
          coursefee: course.courseFee,
          description: course.description,
          importantTechnologiesUsed: course.importantTechnologiesUsed || []
        });
      },
      (error) => {
        console.error('Error fetching course:', error);
        this.router.navigate(['/404'], { queryParams: { errorCode: '18' } });
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const technologies = this.angForm.get('importantTechnologiesUsed')?.value;
      technologies.push(value);
      this.angForm.get('importantTechnologiesUsed')?.setValue(technologies);
    }

    event.chipInput!.clear();
  }

  remove(tech: string): void {
    const technologies = this.angForm.get('importantTechnologiesUsed')?.value;
    const index = technologies.indexOf(tech);
    if (index >= 0) {
      technologies.splice(index, 1);
      this.angForm.get('importantTechnologiesUsed')?.setValue(technologies);
    }
  }

  edit(tech: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();
    const technologies = this.angForm.get('importantTechnologiesUsed')?.value;

    if (value && technologies.indexOf(tech) >= 0) {
      const index = technologies.indexOf(tech);
      technologies[index] = value;
      this.angForm.get('importantTechnologiesUsed')?.setValue(technologies);
    }
  }

  onSubmit() {
    if (this.angForm.valid) {


      if (this.isEditMode) {
        const courseData = {
          id: this.updatableid,
          courseName: this.angForm.value.name,
          tutor: this.angForm.value.author,
          duration: this.angForm.value.duration,
          description: this.angForm.value.description,
          importantTechnologiesUsed: this.angForm.value.importantTechnologiesUsed,
          courseFee: this.angForm.value.coursefee,
          credits: this.angForm.value.credits
        };
        this.dataService.updateCourse(courseData).subscribe(
          (response) => {
            console.log('Course updated successfully:', response);
            alert('Course updated successfully!');
            this.router.navigate(['/courses']);
          },
          (error) => {
            console.error('Error updating course:', error);
            alert('Failed to update course. Please try again.');
          }
        );
      } else {
        const courseData = {
          courseName: this.angForm.value.name,
          tutor: this.angForm.value.author,
          duration: this.angForm.value.duration,
          description: this.angForm.value.description,
          importantTechnologiesUsed: this.angForm.value.importantTechnologiesUsed,
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
      }
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
