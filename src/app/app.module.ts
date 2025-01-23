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
import { MaterialModule } from './shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddcourseComponent } from './pages/addcourse/addcourse.component';
import { HerosectionComponent } from './pages/home/herosection/herosection.component';
import { StatisticssectionComponent } from './pages/home/statisticssection/statisticssection.component';
import { CoursesectionComponent } from './pages/home/coursesection/coursesection.component';
import { TestimonialsectionComponent } from './pages/home/testimonialsection/testimonialsection.component';
import { HttpClientModule } from '@angular/common/http';
import { FaqpageComponent } from './otherpages/faqpage/faqpage.component';
import { N404pageComponent } from './otherpages/n404page/n404page.component';
import { PrivacypageComponent } from './otherpages/privacypage/privacypage.component';
import { AboutpageComponent } from './otherpages/aboutpage/aboutpage.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SigninComponent } from './pages/profile/signin/signin.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    DashboardComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    LightboxModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [DataService,Userservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
