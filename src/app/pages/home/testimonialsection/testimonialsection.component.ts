import { Component, OnInit, OnDestroy } from '@angular/core';
import { OtherServices } from '../../../services/otherservices.service';
import { Subscription, interval } from 'rxjs'; // Import interval

@Component({
  selector: 'app-testimonials-section',
  standalone:false,
  templateUrl: './testimonialsection.component.html',
  styleUrls: ['./testimonialsection.component.css'],
})
export class TestimonialsectionComponent implements OnInit, OnDestroy {
pauseAutoplay() {
   if (this.autoplaySubscription) {
      this.autoplaySubscription.unsubscribe();
    }
}
  testimonials: any[] = [];
  currentIndex = 0;
  private autoplaySubscription: Subscription | undefined;

  constructor(private otherServices: OtherServices) {}

  ngOnInit(): void {
    this.otherServices.getappdata().subscribe((data: any) => {
      this.testimonials = data.testimonials || [];
      this.startAutoplay();
    });
  }

  ngOnDestroy(): void {
    if (this.autoplaySubscription) {
      this.autoplaySubscription.unsubscribe();
    }
  }

  startAutoplay(): void {
    this.autoplaySubscription = interval(5000).subscribe(() => {
      this.nextTestimonial();
    });
  }

  nextTestimonial(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }
}
