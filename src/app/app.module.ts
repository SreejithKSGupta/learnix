import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LightboxModule } from 'ngx-lightbox';
import { AppComponent } from './app.component';
import { HeaderComponent } from './widgets/header/header.component';
import { FooterComponent } from './widgets/footer/footer.component';
import { ReactpageComponent } from './pages/reactpage/reactpage.component';
import { AngularpageComponent } from './pages/angularpage/angularpage.component';
import { NavbarComponent } from './widgets/navbar/navbar.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { SamplelistComponent } from './pages/samplelist/samplelist.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
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

 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ReactpageComponent,
    NavbarComponent,
    GalleryComponent,
    AngularpageComponent,
    SamplelistComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
