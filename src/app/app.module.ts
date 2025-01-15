import { NgModule } from '@angular/core';
import { AppRoutingModule, router } from './app-routing.module';
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
import { FormsModule } from '@angular/forms';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
     LightboxModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
