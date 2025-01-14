import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AngularpageComponent} from './pages/angularpage/angularpage.component';
import {ReactpageComponent} from './pages/reactpage/reactpage.component';
import {GalleryComponent} from './pages/gallery/gallery.component';
import {ContactpageComponent} from './pages/contactpage/contactpage.component';
import {HomeComponent} from './pages/home/home.component';


export const router: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' }, 
  { path: 'contact', component: ContactpageComponent },
  { path: 'angular', component: AngularpageComponent },
  { path: 'react', component: ReactpageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
