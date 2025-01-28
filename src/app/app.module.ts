import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './services/data.service';
import { Userservice } from './services/user.service';
import { LightboxModule } from 'ngx-lightbox';
import { AppComponent } from './app.component';
import { HeaderComponent } from './widgets/header/header.component';
import { FooterComponent } from './widgets/footer/footer.component';
import { NavbarComponent } from './widgets/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/profile/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/profile/dashboard/dashboard.component';
import { MaterialModule } from './shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddcourseComponent } from './pages/courses/addcourse/addcourse.component';
import { HerosectionComponent } from './pages/home/herosection/herosection.component';
import { StatisticssectionComponent } from './pages/home/statisticssection/statisticssection.component';
import { CoursesectionComponent } from './pages/home/coursesection/coursesection.component';
import { TestimonialsectionComponent } from './pages/home/testimonialsection/testimonialsection.component';
import { HttpClientModule } from '@angular/common/http';
import { FaqpageComponent } from './pages/otherpages/faqpage/faqpage.component';
import { N404pageComponent } from './pages/otherpages/n404page/n404page.component';
import { PrivacypageComponent } from './pages/otherpages/privacypage/privacypage.component';
import { AboutpageComponent } from './pages/otherpages/aboutpage/aboutpage.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { SigninComponent } from './pages/profile/signin/signin.component';
import { ForgotpasswordComponent } from './pages/profile/forgotpassword/forgotpassword.component';
import { OtherServices } from './services/otherservices.service';
import { ContactUsComponent } from './pages/otherpages/contactpage/contactpage.component';
import { ServicesModule } from './shared/services/services.module';
import { ImageboxComponent } from './components/imagebox/imagebox.component';
import { CourseCardComponent } from './components/coursecard/coursecard.component';
import { ModelwindowComponent } from './components/modelwindow/modelwindow.component';
import { AdmindashboardComponent } from './pages/profile/admindashboard/admindashboard.component';

@NgModule({
  declarations: [
    ContactUsComponent,
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    AddcourseComponent,
    HerosectionComponent,
    HomeComponent,
    StatisticssectionComponent,
    CoursesectionComponent,
    TestimonialsectionComponent,
    FaqpageComponent,
    N404pageComponent,
    PrivacypageComponent,
    AboutpageComponent,
    CoursesComponent,
    BlogsComponent,
    SigninComponent,
    ForgotpasswordComponent,
    ImageboxComponent,
    CourseCardComponent,
    ModelwindowComponent,
    AdmindashboardComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ServicesModule,
    LightboxModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DataService, Userservice, OtherServices],
  bootstrap: [AppComponent],
})
export class AppModule {}
