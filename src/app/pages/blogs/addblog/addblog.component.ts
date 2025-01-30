import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
BlogService
@Component({
  selector: 'app-addblog',
  standalone:false,
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class BlogAddComponent {
  blogForm: FormGroup;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ['', Validators.required],
      imageURL: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.blogForm.patchValue({ imageURL: this.imagePreview });
      };
      reader.readAsDataURL(file);
    }
  }

  submitBlog() {
    if (this.blogForm.valid) {
      const newBlog = {
        ...this.blogForm.value,
        date: new Date().toISOString()
      };

      this.blogService.addBlog(newBlog).subscribe(() => {
        alert('Blog added successfully!');
        this.blogForm.reset();
        this.imagePreview = null;
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
