import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './pages/otherpages/contactpage/contactpage.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/profile/login/login.component';
import { AddcourseComponent } from './pages/courses/addcourse/addcourse.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { FaqpageComponent } from './pages/otherpages/faqpage/faqpage.component';
import { AboutpageComponent } from './pages/otherpages/aboutpage/aboutpage.component';
import { N404pageComponent } from './pages/otherpages/n404page/n404page.component';
import { PrivacypageComponent } from './pages/otherpages/privacypage/privacypage.component';
import { SigninComponent } from './pages/profile/signin/signin.component';
import { DashboardComponent } from './pages/profile/dashboard/dashboard.component';
import { ForgotpasswordComponent } from './pages/profile/forgotpassword/forgotpassword.component';
import { AdmindashboardComponent } from './pages/profile/admindashboard/admindashboard.component';
import { BlogAddComponent } from './pages/blogs/addblog/addblog.component';
import { FeaturespageComponent } from './pages/otherpages/featurespage/featurespage.component';
import { BlogviewpageComponent } from './dynamicpages/blogviewpage/blogviewpage.component';
import { CourseviewpageComponent } from './dynamicpages/courseviewpage/courseviewpage.component';
import { SettingsComponent } from './pages/otherpages/settings/settings.component';

export const router: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'blog/:id', component: BlogviewpageComponent },
  { path: 'course/:id', component: CourseviewpageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {path:  'signin', component: SigninComponent},
  { path: 'addcourse', component: AddcourseComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'faq', component: FaqpageComponent },
  { path: 'about', component: AboutpageComponent },
  { path: 'privacy', component: PrivacypageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path:  'forgot-password', component: ForgotpasswordComponent},
  { path:'adminipanel',component:AdmindashboardComponent},
  {path:'features',component: FeaturespageComponent},
  { path: 'add-blog', component: BlogAddComponent },
  { path: '**', component: N404pageComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
