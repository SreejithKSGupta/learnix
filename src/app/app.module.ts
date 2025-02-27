import { NgModule, isDevMode } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './services/data.service';
import { Userservice } from './services/user.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './widgets/header/header.component';
import { FooterComponent } from './widgets/footer/footer.component';
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
import { MessagereplyComponent } from './components/messagereply/messagereply.component';
import { BlogAddComponent } from './pages/blogs/addblog/addblog.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartboxComponent } from './components/chartbox/chartbox.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoredModule } from './shared/store/store.module';
import { UserdataComponent } from './components/userdata/userdata.component';
import { FeaturespageComponent } from './pages/otherpages/featurespage/featurespage.component';
import { CourseCardComponentnew } from './components/course-card/course-card.component';
import { StudentdashboardComponent } from './pages/profile/studentdashboard/studentdashboard.component';
import { TutordashboardComponent } from './pages/profile/tutordashboard/tutordashboard.component';
import { ParticlesbgComponent } from './components/particlesbg/particlesbg.component';
import { NgxParticlesModule } from '@tsparticles/angular';
import { CountUpModule } from 'ngx-countup';
import { QuillModule } from 'ngx-quill';
import { CoursePageCourseCardComponent } from './components/course-page-course-card/course-page-course-card.component';
import { WysiwygEditorComponent } from './components/wysiwyg-editor/wysiwyg-editor.component';
import { BlogviewpageComponent } from './dynamicpages/blogviewpage/blogviewpage.component';
import { CourseviewpageComponent } from './dynamicpages/courseviewpage/courseviewpage.component';
import { SettingsComponent } from './pages/otherpages/settings/settings.component';
import { BlogCardComponent } from './components/blogCard/blogCard.component';
import { CommentboxComponent } from './widgets/commentbox/commentbox.component';
import { BlogpostsComponent } from './pages/home/blogposts/blogposts.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    ContactUsComponent,
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    LoginComponent,
    AddcourseComponent,
    HerosectionComponent,
    HomeComponent,
    CourseCardComponentnew,
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
    MessagereplyComponent,
    BlogsComponent,
    BlogAddComponent,
    ChartboxComponent,
    UserdataComponent,
    FeaturespageComponent,
    StudentdashboardComponent,
    TutordashboardComponent,
    ParticlesbgComponent,
    CoursePageCourseCardComponent,
    WysiwygEditorComponent,
    BlogviewpageComponent,
    CourseviewpageComponent,
    SettingsComponent,
    BlogCardComponent,
    CommentboxComponent,
    BlogpostsComponent,
  ],
  imports: [
    BrowserModule,
    QuillModule.forRoot() ,
    CountUpModule,
    NgxParticlesModule,
    MaterialModule,
    StoredModule,
    ServicesModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    DataService,
    Userservice,
    OtherServices,
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
