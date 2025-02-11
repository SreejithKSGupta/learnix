import { Course } from './../../../interfaces/course';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { CloudinarymanagerService } from '../../../services/cloudinarymanager.service';
import { OtherServices } from '../../../services/otherservices.service';

@Component({
  selector: 'app-addcourse',
  standalone: false,
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css'],
})
export class AddcourseComponent implements OnInit {
  title = 'Add New Courses';
  angForm!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;
  isEditMode = false;
  updatableid: any;
  selectedFile: File | null = null;
  richtext:any;
  currentcourseId:any;
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private cloudinaryService: CloudinarymanagerService,
    private otherServices: OtherServices
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const courseId = params['id'];
      if (courseId) {
        this.isEditMode = true;
        this.updatableid = courseId;
        this.populateForm(courseId);
      }
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z][A-Za-z0-9 ]*$')]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z ]*$')]],
      duration: ['', [Validators.required, Validators.min(4), Validators.max(12), Validators.pattern('^[0-9]*$')]],
      credits: ['', [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern('^[0-9]*$')]],
      coursefee: ['', [Validators.required, Validators.min(0), Validators.max(5000), Validators.pattern('^[0-9]*$')]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      importantTechnologiesUsed: [[]],
    });
  }

  populateForm(courseId: string): void {
    this.dataService.getcoursebyid(courseId).subscribe(
      (course) => {
        this.currentcourseId = course.id;
        this.angForm.patchValue({
          name: course.courseName,
          author: course.tutor,
          duration: course.duration,
          credits: course.credits,
          coursefee: course.courseFee,
          description: course.description,
          importantTechnologiesUsed: course.importantTechnologiesUsed || [],
        });
      },
      (error) => {
        console.error('Error fetching course:', error);
        this.router.navigate(['/404'], { queryParams: { errorCode: '18' } });
      }
    );
  }

  onFileSelected(file: File | null): void {
    this.selectedFile = file;
    console.log('File received:', file);
  }

  hasError(controlName: string): boolean {
    const control = this.angForm.get(controlName);
    return control?.touched && control?.invalid ? true : false;
  }

  addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const technologies = this.angForm.get('importantTechnologiesUsed')?.value;
      technologies.push(value);
      this.angForm.get('importantTechnologiesUsed')?.setValue(technologies);
    }
    event.chipInput!.clear();
  }

  removeChip(tech: string): void {
    const technologies = this.angForm.get('importantTechnologiesUsed')?.value;
    const index = technologies.indexOf(tech);
    if (index >= 0) {
      technologies.splice(index, 1);
      this.angForm.get('importantTechnologiesUsed')?.setValue(technologies);
    }
  }

  editChip(tech: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();
    const technologies = this.angForm.get('importantTechnologiesUsed')?.value;
    if (value && technologies.indexOf(tech) >= 0) {
      const index = technologies.indexOf(tech);
      technologies[index] = value;
      this.angForm.get('importantTechnologiesUsed')?.setValue(technologies);
    }
  }

  onRichTextChange(richtextobject: any) {
      this.richtext = richtextobject;
  }

  onSubmit() {
    if (this.angForm.valid) {
      this.otherServices.showalert('confirm', 'Submit Course').subscribe((res) => {
        if (res === 'yes') {
          if (this.selectedFile) {

            this.cloudinaryService.uploadImage(this.selectedFile).subscribe(
            (url: string | undefined) => {
              this.submitForm(url);
            },
            (error: any) => {
              console.error('Error uploading image:', error);
              this.otherServices.showalert('info', 'Image upload failed. Try again!').subscribe();
            }
          );
        }
        else {
          this.submitForm();
        }
      }
      });
    } else {
      this.otherServices.showalert('info', 'Please fill in all fields').subscribe();
    }
  }

  submitForm(imageUrl?: string) {
    const courseData: Course = {
      courseName: this.angForm.value.name,
      tutor: this.angForm.value.author,
      duration: this.angForm.value.duration,
      description: this.angForm.value.description,
      importantTechnologiesUsed: this.angForm.value.importantTechnologiesUsed,
      courseFee: this.angForm.value.coursefee,
      credits: this.angForm.value.credits,
      imageUrl: imageUrl || null,
      content: this.richtext,
    };

    const submit$ = this.isEditMode
      ? this.dataService.updateCourse(courseData,this.currentcourseId)
      : this.dataService.addcourse(courseData);

    submit$.subscribe(
      (response) => {
        alert(`${this.isEditMode ? 'Updated' : 'Added'} successfully!`);
        this.router.navigate(['/courses']);
      },
      (error) => {
        console.error(`Failed to ${this.isEditMode ? 'update' : 'add'} course:`, error);
        alert(`Failed to ${this.isEditMode ? 'update' : 'add'} course. Please try again.`);
      }
    );
  }
}
