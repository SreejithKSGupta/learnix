import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LightboxModule } from 'ngx-lightbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './widgets/header/header.component';
import { FooterComponent } from './widgets/footer/footer.component';
import { ReactpageComponent } from './pages/reactpage/reactpage.component';
import { AngularpageComponent } from './pages/angularpage/angularpage.component';
import { NavbarComponent } from './widgets/navbar/navbar.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { SamplelistComponent } from './samplelist/samplelist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ReactpageComponent,
    NavbarComponent,
    GalleryComponent,
    AngularpageComponent,
    SamplelistComponent
  ],
  imports: [
    BrowserModule,
     LightboxModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
