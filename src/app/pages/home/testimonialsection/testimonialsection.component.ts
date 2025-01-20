import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  standalone:false,
  selector: 'app-testimonials-section',
  templateUrl: './testimonialsection.component.html',
  styleUrl: './testimonialsection.component.css',
})
export class TestimonialsectionComponent implements OnInit, OnDestroy {
  testimonials = [
    {
      name: 'James L.',
      Test: 'As a retiree, I wanted to continue learning, and this platform made it easy to stay engaged and learn at my own pace.',
      position: 'Retired',
    },
  ];
  currentIndex = 0;
  autoplayInterval: any = null;
  apiUrl = 'https://api.jsonbin.io/v3/b/6788a954e41b4d34e4783023/latest';
  private subscription: Subscription | null = null;

  private masterKey = '$2a$10$x1xZJYdkDcwurCkY31PvD.wpYb37N5OswPY9WeOQ/HnWvvQ9YZNtC';
  private accessKey = '$2a$10$IMKd0tQnu.oX8gqp3I7tg.OpV4mKVIzh2KjKXwPE3n2rCMCYQZrlO';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTestimonials();
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
    if (this.subscription) this.subscription.unsubscribe();
  }

  getTestimonials(): void {
    const headers = new HttpHeaders({
      'X-Master-Key': this.masterKey,
      'X-Access-Key': this.accessKey,
    });

    this.subscription = this.http
      .get<{ record: any }>(this.apiUrl, { headers })
      .subscribe(
        (response) => {
          this.testimonials = response.record;
        },
        (error) => {
          console.error('Error fetching testimonials', error);
        }
      );
  }

  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
  }

  nextTestimonial(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }
}
