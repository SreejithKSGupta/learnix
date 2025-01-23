import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactpageComponent } from './pages/contactpage/contactpage.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/profile/login/login.component';
import { AddcourseComponent } from './pages/addcourse/addcourse.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { FaqpageComponent } from './otherpages/faqpage/faqpage.component';
import { AboutpageComponent } from './otherpages/aboutpage/aboutpage.component';
import { N404pageComponent } from './otherpages/n404page/n404page.component';
import { PrivacypageComponent } from './otherpages/privacypage/privacypage.component';
import { SigninComponent } from './pages/profile/signin/signin.component';
import { DashboardComponent } from './pages/profile/dashboard/dashboard.component';

export const router: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'contact', component: ContactpageComponent },
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
  { path: '**', component: N404pageComponent } // 404 route
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
