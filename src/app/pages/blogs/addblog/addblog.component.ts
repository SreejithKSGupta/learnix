import { OtherServices } from './../../../services/otherservices.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
import { CloudinarymanagerService } from '../../../services/cloudinarymanager.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserState } from '../../../store/selectors/user.selector';
import { User } from '../../../interfaces/users';


BlogService
@Component({
  selector: 'app-addblog',
  standalone:false,
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class BlogAddComponent {
  blogForm: FormGroup;
  currentuser!:User;

  constructor(private fb: FormBuilder, private blogService: BlogService,private otherServices:OtherServices, private cloudinaryservices:CloudinarymanagerService, private router:Router, private store:Store) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      post: ['', Validators.required],
      topic: ['', Validators.required],
      content: ['', Validators.required],
      description:['',Validators.required],
      imageURL: ['', Validators.required]
    });
  }

  ngOnInit(){
         // check if the user is either tutor or admin, otherwise,redirect to 404 with an errrorcode 21
         this.store.select(selectUserState).subscribe((userState) => {
          this.currentuser = userState;
          if(this.currentuser.userType !== 'tutor' && this.currentuser.userType!=='admin'){
            this.router.navigate(['/404'], { queryParams: { errorCode: 403 } });
          }
        });
  }

  onImageSelected(file: any): void {
    if (file) {
      this.cloudinaryservices.uploadImage(file).subscribe(imgurl=>{
        this.blogForm.patchValue({ imageURL:imgurl });

      })

    }
  }

  onRichTextChange(richtextobject:any){
    this.blogForm.patchValue({ content:richtextobject });
  }

  submitBlog() {
    if (this.blogForm.valid) {
      const newBlog = {
        ...this.blogForm.value,
        date: new Date().toISOString()
      };

      this.otherServices.showalert('confirm', 'Submit blog?')
      .subscribe((result) => {
        if(result=='yes'){
          this.blogService.addBlog(newBlog).subscribe(() => {
            this.blogForm.reset();});
            this.router.navigate(['/blogs']);
        }
       })



    } else {
      alert('Please fill in all required fields.');
    }
  }
}
